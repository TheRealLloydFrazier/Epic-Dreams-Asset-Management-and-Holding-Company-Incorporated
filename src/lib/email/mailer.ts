import nodemailer from 'nodemailer';

const hasSmtpConfig = Boolean(
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASSWORD
);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  : null;

const FROM_EMAIL = process.env.SMTP_USER || 'noreply@epicdreamsent.com';
const STORE_NAME = 'Epic Dreams Entertainment';

type OrderItem = {
  title: string;
  quantity: number;
  priceCents: number;
};

type OrderEmailData = {
  orderId: number;
  email: string;
  totalCents: number;
  items: OrderItem[];
  shippingAddress?: {
    name?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  } | null;
};

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cents / 100);
}

export async function sendOrderConfirmation(data: OrderEmailData): Promise<boolean> {
  if (!transporter) {
    console.log('SMTP not configured, skipping order confirmation email');
    return false;
  }

  const itemsList = data.items
    .map((item) => `  - ${item.title} x${item.quantity} - ${formatCurrency(item.priceCents)}`)
    .join('\n');

  const shippingInfo = data.shippingAddress
    ? `
Shipping To:
${data.shippingAddress.name || ''}
${data.shippingAddress.address?.line1 || ''}
${data.shippingAddress.address?.line2 || ''}
${data.shippingAddress.address?.city || ''}, ${data.shippingAddress.address?.state || ''} ${data.shippingAddress.address?.postal_code || ''}
${data.shippingAddress.address?.country || ''}
`.trim()
    : '';

  const textContent = `
Thank you for your order!

Order #${data.orderId}

Items:
${itemsList}

Total: ${formatCurrency(data.totalCents)}

${shippingInfo}

We'll send you another email when your order ships.

Questions? Reply to this email or contact support@epicdreamsent.com

- ${STORE_NAME}
`.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #111; border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
      <h1 style="color: #2dd4bf; margin: 0 0 8px 0; font-size: 24px;">Thank you for your order!</h1>
      <p style="color: rgba(255,255,255,0.6); margin: 0 0 24px 0; font-size: 14px;">Order #${data.orderId}</p>

      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 24px;">
        <h2 style="color: #fff; font-size: 16px; margin: 0 0 16px 0;">Items</h2>
        ${data.items
          .map(
            (item) => `
          <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <span style="color: #fff;">${item.title} <span style="color: rgba(255,255,255,0.5);">x${item.quantity}</span></span>
            <span style="color: rgba(255,255,255,0.7);">${formatCurrency(item.priceCents)}</span>
          </div>
        `
          )
          .join('')}
        <div style="display: flex; justify-content: space-between; padding: 16px 0; font-weight: 600;">
          <span style="color: #fff;">Total</span>
          <span style="color: #2dd4bf;">${formatCurrency(data.totalCents)}</span>
        </div>
      </div>

      ${
        data.shippingAddress
          ? `
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 24px;">
        <h2 style="color: #fff; font-size: 16px; margin: 0 0 12px 0;">Shipping To</h2>
        <p style="color: rgba(255,255,255,0.7); margin: 0; line-height: 1.6;">
          ${data.shippingAddress.name || ''}<br>
          ${data.shippingAddress.address?.line1 || ''}<br>
          ${data.shippingAddress.address?.line2 ? data.shippingAddress.address.line2 + '<br>' : ''}
          ${data.shippingAddress.address?.city || ''}, ${data.shippingAddress.address?.state || ''} ${data.shippingAddress.address?.postal_code || ''}<br>
          ${data.shippingAddress.address?.country || ''}
        </p>
      </div>
      `
          : ''
      }

      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 24px;">
        <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0;">
          We'll send you another email when your order ships.
        </p>
      </div>
    </div>

    <p style="color: rgba(255,255,255,0.4); font-size: 12px; text-align: center; margin-top: 24px;">
      Questions? Contact <a href="mailto:support@epicdreamsent.com" style="color: #2dd4bf;">support@epicdreamsent.com</a>
    </p>
  </div>
</body>
</html>
`.trim();

  try {
    await transporter.sendMail({
      from: `"${STORE_NAME}" <${FROM_EMAIL}>`,
      to: data.email,
      subject: `Order Confirmation #${data.orderId} - ${STORE_NAME}`,
      text: textContent,
      html: htmlContent
    });
    console.log(`Order confirmation email sent to ${data.email}`);
    return true;
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return false;
  }
}

export async function sendShippingNotification(
  email: string,
  orderId: number,
  trackingNumber: string,
  carrier?: string
): Promise<boolean> {
  if (!transporter) {
    console.log('SMTP not configured, skipping shipping notification email');
    return false;
  }

  const textContent = `
Your order has shipped!

Order #${orderId}
Tracking Number: ${trackingNumber}
${carrier ? `Carrier: ${carrier}` : ''}

Track your package using your tracking number at your carrier's website.

Questions? Reply to this email or contact support@epicdreamsent.com

- ${STORE_NAME}
`.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Order Has Shipped</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #111; border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
      <h1 style="color: #2dd4bf; margin: 0 0 8px 0; font-size: 24px;">Your order has shipped!</h1>
      <p style="color: rgba(255,255,255,0.6); margin: 0 0 24px 0; font-size: 14px;">Order #${orderId}</p>

      <div style="background-color: rgba(45,212,191,0.1); border-radius: 12px; padding: 20px; margin: 24px 0;">
        <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.1em;">Tracking Number</p>
        <p style="color: #2dd4bf; font-size: 18px; margin: 0; font-family: monospace;">${trackingNumber}</p>
        ${carrier ? `<p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 8px 0 0 0;">${carrier}</p>` : ''}
      </div>

      <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0;">
        Track your package using your tracking number at your carrier's website.
      </p>
    </div>

    <p style="color: rgba(255,255,255,0.4); font-size: 12px; text-align: center; margin-top: 24px;">
      Questions? Contact <a href="mailto:support@epicdreamsent.com" style="color: #2dd4bf;">support@epicdreamsent.com</a>
    </p>
  </div>
</body>
</html>
`.trim();

  try {
    await transporter.sendMail({
      from: `"${STORE_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: `Your Order Has Shipped - Order #${orderId}`,
      text: textContent,
      html: htmlContent
    });
    console.log(`Shipping notification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Failed to send shipping notification email:', error);
    return false;
  }
}
