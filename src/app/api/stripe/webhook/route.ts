import Stripe from 'stripe';
import { prisma } from '@lib/db/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new NextResponse('Missing webhook signature', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook error', error?.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (!session.customer_details?.email) return NextResponse.json({ received: true });

    // Idempotency check: prevent duplicate orders from webhook retries
    const existingOrder = await prisma.order.findFirst({
      where: { stripeCheckoutSessionId: session.id }
    });
    if (existingOrder) {
      console.log('Order already exists for session', session.id);
      return NextResponse.json({ received: true });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

    const cartItemsRaw = session.metadata?.cart ? JSON.parse(session.metadata.cart) : [];
    const cartItems = Array.isArray(cartItemsRaw) ? cartItemsRaw : [];

    try {
      // Use transaction to ensure order creation and inventory updates are atomic
      const order = await prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({
          data: {
            email: session.customer_details!.email!,
            totalCents: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'Paid',
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
            shippingAddress: session.shipping_details ? JSON.parse(JSON.stringify(session.shipping_details)) : null,
            billingAddress: session.customer_details ? JSON.parse(JSON.stringify(session.customer_details)) : null,
            items: {
              create: lineItems.data.map((item, index) => {
                const cartMeta = cartItems[index] as { variantId?: number; quantity?: number } | undefined;
                const variantId = Number(item.price?.metadata?.variantId || cartMeta?.variantId);
                return {
                  title: item.description || 'Item',
                  sku: item.price?.id || 'sku',
                  quantity: item.quantity || 1,
                  priceCents: item.amount_total || 0,
                  productVariantId: variantId || undefined
                };
              })
            }
          }
        });

        // Decrement inventory within the same transaction
        for (const cartItem of cartItems as Array<{ variantId?: number; quantity?: number }>) {
          if (!cartItem?.variantId || !cartItem.quantity) continue;
          await tx.productVariant.update({
            where: { id: cartItem.variantId },
            data: {
              inventory: {
                decrement: cartItem.quantity
              }
            }
          });
        }

        return createdOrder;
      });

      console.log('Order created', order.id);
    } catch (error) {
      console.error('Error creating order:', error);
      return new NextResponse('Error processing order', { status: 500 });
    }
  }

  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge;
    const paymentIntentId = charge.payment_intent as string;

    // Find the order and its items to restore inventory
    const orders = await prisma.order.findMany({
      where: { stripePaymentIntentId: paymentIntentId },
      include: { items: true }
    });

    for (const order of orders) {
      // Restore inventory for each item
      for (const item of order.items) {
        if (item.productVariantId) {
          await prisma.productVariant.update({
            where: { id: item.productVariantId },
            data: {
              inventory: {
                increment: item.quantity
              }
            }
          });
        }
      }

      // Update order status
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'Refunded' }
      });
    }
  }

  return NextResponse.json({ received: true });
}
