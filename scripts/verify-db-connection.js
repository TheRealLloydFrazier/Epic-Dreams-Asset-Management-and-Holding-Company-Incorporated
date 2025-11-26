#!/usr/bin/env node

/**
 * Database Connection Verification Script
 *
 * This script verifies that:
 * 1. DATABASE_URL is set
 * 2. The connection string format is valid
 * 3. The database is reachable
 * 4. Basic queries can be executed
 *
 * Run with: node scripts/verify-db-connection.js
 */

const { PrismaClient } = require('@prisma/client');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

function extractHostFromDatabaseUrl(url) {
  try {
    const match = url.match(/@([^/]+)/);
    return match ? match[1] : 'unknown';
  } catch {
    return 'unknown';
  }
}

async function verifyDatabaseConnection() {
  log('\n🔍 Database Connection Verification\n', COLORS.cyan);

  // Step 1: Check if DATABASE_URL is set
  log('1. Checking DATABASE_URL environment variable...', COLORS.blue);

  if (!process.env.DATABASE_URL) {
    log('   ❌ DATABASE_URL is not set', COLORS.red);
    log('   Please set DATABASE_URL in your .env.local file or environment', COLORS.yellow);
    process.exit(1);
  }

  log('   ✅ DATABASE_URL is set', COLORS.green);

  const host = extractHostFromDatabaseUrl(process.env.DATABASE_URL);
  log(`   📍 Host: ${host}\n`, COLORS.blue);

  // Step 2: Validate connection string format
  log('2. Validating connection string format...', COLORS.blue);

  if (!process.env.DATABASE_URL.startsWith('postgresql://') &&
      !process.env.DATABASE_URL.startsWith('postgres://')) {
    log('   ❌ DATABASE_URL must start with postgresql:// or postgres://', COLORS.red);
    process.exit(1);
  }

  log('   ✅ Connection string format is valid\n', COLORS.green);

  // Step 3: Test database connection
  log('3. Testing database connection...', COLORS.blue);

  const prisma = new PrismaClient();

  try {
    // Try to connect and run a simple query
    await prisma.$connect();
    log('   ✅ Successfully connected to database', COLORS.green);

    // Step 4: Test a simple query
    log('\n4. Testing database query...', COLORS.blue);
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    log('   ✅ Query executed successfully', COLORS.green);

    // Step 5: Check if migrations are up to date
    log('\n5. Checking database schema...', COLORS.blue);
    try {
      // Try to query a known table to verify schema exists
      await prisma.$queryRaw`SELECT COUNT(*) FROM "Product" LIMIT 1`;
      log('   ✅ Database schema appears to be initialized', COLORS.green);
    } catch (schemaError) {
      log('   ⚠️  Database schema may not be initialized', COLORS.yellow);
      log('   Run: npx prisma migrate deploy', COLORS.yellow);
    }

    log('\n✅ All database connection checks passed!\n', COLORS.green);

  } catch (error) {
    log('   ❌ Failed to connect to database', COLORS.red);
    log(`\n   Error: ${error.message}\n`, COLORS.red);

    // Provide helpful error messages based on common errors
    if (error.code === 'P1001') {
      log('   💡 Troubleshooting tips:', COLORS.yellow);
      log('   - Verify the database host is correct', COLORS.yellow);
      log('   - Check if the database server is running', COLORS.yellow);
      log('   - Ensure your IP is allowed in the database firewall', COLORS.yellow);
      log(`   - Current host: ${host}`, COLORS.yellow);

      // Check for common typos in Neon endpoints
      if (host.includes('ah40v0ji')) {
        log('\n   ⚠️  WARNING: Possible typo detected!', COLORS.red);
        log('   Your host contains "ah40v0ji" - did you mean "ah40v0jr"?', COLORS.red);
        log('   Please verify your DATABASE_URL is correct.', COLORS.red);
      }
    } else if (error.code === 'P1002') {
      log('   💡 The database server was reached but timed out', COLORS.yellow);
      log('   - Check database server status', COLORS.yellow);
      log('   - Verify connection pooling settings', COLORS.yellow);
    } else if (error.code === 'P1003') {
      log('   💡 Database does not exist', COLORS.yellow);
      log('   - Verify the database name in your connection string', COLORS.yellow);
      log('   - Create the database if it doesn\'t exist', COLORS.yellow);
    }

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the verification
verifyDatabaseConnection().catch((error) => {
  log(`\n❌ Unexpected error: ${error.message}\n`, COLORS.red);
  process.exit(1);
});
