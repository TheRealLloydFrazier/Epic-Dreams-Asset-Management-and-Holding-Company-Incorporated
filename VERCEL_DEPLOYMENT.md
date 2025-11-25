# Deploying Epic Dreams Store to Vercel

This guide walks you through deploying your Epic Dreams e-commerce store to Vercel.

## Prerequisites

- GitHub account with this repository
- Vercel account (free tier works - sign up at https://vercel.com)
- PostgreSQL database (Vercel Postgres, Supabase, or Neon)
- Stripe account

## Step 1: Set Up Database

You have several options for PostgreSQL:

### Option A: Vercel Postgres (Recommended)
1. After importing your project, go to the Storage tab
2. Click "Create Database" → "Postgres"
3. Vercel will automatically set the `DATABASE_URL` environment variable

### Option B: External Database (Supabase/Neon)
1. Create a free PostgreSQL database at:
   - Supabase: https://supabase.com
   - Neon: https://neon.tech
2. Copy the connection string (it looks like: `postgresql://user:pass@host/db`)
3. You'll add this as `DATABASE_URL` in Step 3

## Step 2: Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select this repository: `Epic-Dreams-Asset-Management-and-Holding-Company-Incorporated`
4. Vercel will auto-detect Next.js - click "Deploy"
5. **Don't worry if it fails** - we need to add environment variables first

### Method 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Step 3: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXT_PUBLIC_APP_URL` | Your deployed URL | `https://epicdreamsassetmanagement.vercel.app` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` or `pk_live_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` or `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` (see Step 5) |
| `ADMIN_SESSION_SECRET` | Random 32+ character string | Generate with: `openssl rand -base64 32` |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | Email server for notifications |
| `SMTP_PORT` | Email server port (usually 587) |
| `SMTP_USER` | Email username |
| `SMTP_PASSWORD` | Email password |
| `PLAUSIBLE_DOMAIN` | Analytics domain |
| `KLAVIYO_PRIVATE_KEY` | Klaviyo API key |

3. Click **Save** after adding each variable
4. After adding all variables, go to **Deployments** and click **Redeploy**

## Step 4: Run Database Migrations

After your deployment succeeds:

### Option A: Using Vercel CLI
```bash
vercel env pull .env.local
npm run prisma:generate
npm run prisma:migrate
npm run db:seed  # Optional: adds demo data
```

### Option B: Using Vercel Dashboard
1. Go to your project → **Settings** → **Functions**
2. Add a temporary build command:
   ```
   npx prisma migrate deploy && npm run build
   ```
3. Redeploy
4. After migration completes, change build command back to `npm run build`

### Option C: Connect to Database Directly
If using Vercel Postgres:
```bash
vercel env pull
npx prisma migrate deploy
npx prisma db seed  # Optional
```

## Step 5: Configure Stripe Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Enter your webhook URL:
   ```
   https://your-vercel-url.vercel.app/api/stripe/webhook
   ```
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
8. Redeploy your project

## Step 6: Custom Domain (Optional)

To use `epicdreamsassetmanagement.com`:

1. Go to your Vercel project → **Settings** → **Domains**
2. Add your domain: `epicdreamsassetmanagement.com`
3. Follow Vercel's DNS instructions:
   - Add an A record pointing to Vercel's IP
   - Or add a CNAME record pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (can take up to 48 hours)
5. Update `NEXT_PUBLIC_APP_URL` environment variable to your custom domain
6. Update Stripe webhook URL to use your custom domain

## Step 7: Test Your Deployment

1. Visit your deployed URL
2. Test the store browsing
3. Try adding items to cart
4. Use Stripe test card: `4242 4242 4242 4242`
5. Access admin at `/admin` with credentials from seed data:
   - Email: `admin@epicdreamsent.com`
   - Password: `ChangeMe123!`

## Troubleshooting

### Build fails with "Prisma Client not generated"
```bash
# Add to package.json scripts:
"postinstall": "prisma generate"
```

### Database connection fails
- Check `DATABASE_URL` is set correctly
- Ensure database allows connections from Vercel IPs
- For Vercel Postgres, make sure you created it in the same project

### Stripe webhook not working
- Verify webhook URL is correct
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Look at webhook logs in Stripe dashboard

### Images not loading
- Ensure `NEXT_PUBLIC_APP_URL` is set to your deployed URL
- Check image URLs in database are accessible

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:

1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically builds and deploys
4. Preview deployments are created for pull requests

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Next.js Docs: https://nextjs.org/docs
