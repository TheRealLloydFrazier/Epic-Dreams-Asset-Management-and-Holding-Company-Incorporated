# Epic Dreams Entertainment Store

A production-ready merch microstore for Epic Dreams Entertainment, built with Next.js 14, Tailwind CSS, Prisma, and Stripe. Deployable on DeepAgent with PostgreSQL.

## Features

- Bold, high-contrast storefront with product filters, signed variant callouts, and artist/release cross-promotion.
- Full CMS primitives: products with variants, artists, releases, blog posts, collections, and settings.
- Stripe Checkout integration with configurable shipping rates, taxes, and discount codes.
- Admin console with secure session auth, inventory overview, order management, and CSV exports.
- Email capture endpoint, contact form storage, and setup checklist reminders.
- SEO optimized with dynamic metadata, open graph tags, and sitemap generation.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (test mode is supported)

### Environment Variables

Copy `.env.sample` to `.env.local` and update the values:

```bash
cp .env.sample .env.local
```

Required keys:

- `DATABASE_URL` – PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL` – Base URL for the deployed app
- `STRIPE_PUBLISHABLE_KEY` – Stripe publishable key (client-side)
- `STRIPE_SECRET_KEY` – Stripe API secret
- `STRIPE_WEBHOOK_SECRET` – Signing secret from Stripe webhook endpoint
- `ADMIN_SESSION_SECRET` – Long random string for admin sessions

Optional keys for analytics, email, and Klaviyo are also available.

### Install Dependencies

```bash
npm install
```

### Database Setup

Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Seed demo data (products, signed variants, admin user, etc.):

```bash
npm run db:seed
```

Demo admin credentials: admin@epicdreamsent.com / ChangeMe123! (will require a password change flow in production).

### Development Server

```bash
npm run dev
```

Visit http://localhost:3000.

### Stripe Webhook

Expose your dev server and connect Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the signing secret from the Stripe CLI output into `STRIPE_WEBHOOK_SECRET`.

### Deployment on DeepAgent

1. Configure environment variables in DeepAgent, including Stripe keys and `ADMIN_SESSION_SECRET`.
2. Run database migrations via `npm run prisma:migrate`.
3. Seed the database with `npm run db:seed` (optional but recommended for demo content).
4. Build and start the app:

```bash
npm run build
npm start
```

### Setup Checklist

- [ ] Set Stripe API keys and webhook secret.
- [ ] Configure SMTP credentials to enable notification emails.
- [ ] Verify shipping rates and tax configuration in Admin → Settings.
- [ ] Add analytics identifiers (Plausible or GA4).
- [ ] Update policy content in Admin or edit the policy pages.

## Stripe Test Cards

Use 4242 4242 4242 4242 with any future expiry and any CVC. Additional test cards are documented in the Stripe docs.

## Scripts

- `npm run dev` – Start Next.js in development mode
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run db:seed` – Seed demo data
- `npm run prisma:migrate` – Run migrations on the database
- `npm run prisma:studio` – Open Prisma Studio

## License

MIT
