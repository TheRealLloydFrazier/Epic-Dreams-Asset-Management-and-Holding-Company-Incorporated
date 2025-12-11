import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@lib/db/prisma';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

const CheckoutSchema = z.object({
  items: z.array(
    z.object({
      variantId: z.number(),
      quantity: z.number().min(1)
    })
  ),
  discount: z.string().optional()
});

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = CheckoutSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const items = await prisma.productVariant.findMany({
    where: {
      id: {
        in: parsed.data.items.map((item) => item.variantId)
      }
    },
    include: { product: true }
  });

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const cartItem of parsed.data.items) {
    const variant = items.find((item) => item.id === cartItem.variantId);
    if (!variant) continue;
    lineItems.push({
      quantity: cartItem.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: variant.priceCents,
        product_data: {
          name: `${variant.product.title} — ${variant.name}`,
          metadata: {
            variantId: variant.id.toString()
          }
        }
      }
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: 'No valid items' }, { status: 400 });
  }

  const couponId = parsed.data.discount ? await getOrCreateCoupon(parsed.data.discount) : undefined;
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    metadata: {
      cart: JSON.stringify(parsed.data.items)
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cart?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cart?cancel=1`,
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU'] },
    automatic_tax: { enabled: true },
    discounts: couponId ? [{ coupon: couponId }] : undefined,
    shipping_options: [
      { shipping_rate: await getOrCreateShippingRate('us_standard', 'US Standard', 500) },
      { shipping_rate: await getOrCreateShippingRate('us_expedited', 'US Expedited', 1500) },
      { shipping_rate: await getOrCreateShippingRate('intl_flat', 'International Flat', 2500) }
    ]
  });

  return NextResponse.json({ url: session.url });
}

async function getOrCreateShippingRate(key: string, name: string, amount: number) {
  const metadataKey = `shipping:${key}`;
  const setting = await prisma.setting.findUnique({ where: { key: metadataKey } });
  const storedRate = setting?.value as { id?: string } | null;
  if (storedRate?.id) return storedRate.id;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });
  const rate = await stripe.shippingRates.create({
    display_name: name,
    fixed_amount: { amount, currency: 'usd' },
    type: 'fixed_amount'
  });
  await prisma.setting.upsert({
    where: { key: metadataKey },
    create: { key: metadataKey, value: { id: rate.id } },
    update: { value: { id: rate.id } }
  });
  return rate.id;
}

async function getOrCreateCoupon(code: string) {
  const discount = await prisma.discount.findUnique({ where: { code } });
  if (!discount) return undefined;
  const metadataKey = `coupon:${code}`;
  const cached = await prisma.setting.findUnique({ where: { key: metadataKey } });
  const storedCoupon = cached?.value as { id?: string } | null;
  if (storedCoupon?.id) return storedCoupon.id;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });
  const coupon = await stripe.coupons.create({
    name: code,
    currency: 'usd',
    duration: 'once',
    percent_off: discount.type === 'percentage' ? discount.value : undefined,
    amount_off: discount.type === 'fixed' ? discount.value : undefined
  });
  await prisma.setting.upsert({
    where: { key: metadataKey },
    create: { key: metadataKey, value: { id: coupon.id } },
    update: { value: { id: coupon.id } }
  });
  return coupon.id;
}
