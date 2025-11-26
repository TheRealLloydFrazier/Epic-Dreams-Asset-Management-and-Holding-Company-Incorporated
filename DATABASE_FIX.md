# Database Connection Error Fix

## Problem

Build failing with error:
```
Error: P1001: Can't reach database server at `ep-old-butterfly-ah40v0ji-pooler.c-3.us-east-1.aws.neon.tech:5432`
Error: Command "npm run build" exited with 1
```

## Root Cause

The `DATABASE_URL` environment variable in Vercel has an **incorrect endpoint URL**. There's a typo in the Neon database pooler endpoint:

- ❌ **Current (incorrect)**: `ep-old-butterfly-ah40v0**ji**-pooler.c-3.us-east-1.aws.neon.tech`
- ✅ **Correct**: `ep-old-butterfly-ah40v0**jr**-pooler.c-3.us-east-1.aws.neon.tech`

Notice the difference: `ji` vs `jr` at the end of the subdomain.

## Solution

### Step 1: Update DATABASE_URL in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Find the `DATABASE_URL` variable
4. Update it to the correct connection string:
   ```
   postgresql://neondb_owner:npg_Fx6YzPBqyeE2@ep-old-butterfly-ah40v0jr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
5. Click **Save**
6. Make sure to apply this to all environments (Production, Preview, Development)

### Step 2: Redeploy

1. Go to **Deployments** tab
2. Click on the three dots menu on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (optional, for faster rebuild)

### Step 3: Verify Connection

After redeployment succeeds, verify the database connection:

```bash
# If you have Vercel CLI installed locally
vercel env pull .env.local
npm run prisma:generate
npx prisma db execute --stdin <<< "SELECT 1"
```

Or check your application logs in Vercel to ensure no more P1001 errors appear.

## Prevention

To prevent this issue in the future:

1. **Double-check connection strings** when copying from Neon dashboard
2. **Test locally first** by adding the DATABASE_URL to `.env.local` and running:
   ```bash
   npm run build
   ```
3. **Use the verification script** (see `scripts/verify-db-connection.js`)

## Getting the Correct Connection String from Neon

1. Log in to your Neon dashboard: https://console.neon.tech
2. Select your project: `Epic Dreams Store`
3. Go to the **Dashboard** tab
4. Under **Connection Details**, select:
   - **Database**: `neondb`
   - **Role**: `neondb_owner`
   - **Pooled connection** (recommended for serverless)
5. Copy the connection string - it should end with `jr-pooler`, not `ji-pooler`

## Additional Notes

- The incorrect endpoint (`ji`) likely came from a copy-paste error or autocomplete
- Neon pooler endpoints use consistent naming - if you see unusual suffixes, verify them
- Always test database connectivity after changing environment variables
