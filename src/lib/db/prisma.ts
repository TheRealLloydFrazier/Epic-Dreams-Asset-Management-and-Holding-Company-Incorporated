import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Configure Neon to use the WebSocket constructor provided by the `ws` package.
neonConfig.webSocketConstructor = ws;

// Read the database connection string from the environment.
const connectionString = process.env.DATABASE_URL;

/**
 * Create a new Prisma client with the Neon adapter.  When no `DATABASE_URL` is
 * provided the fallback creates a standard PrismaClient instance which will
 * generate SQL queries against a local database.  In production deployments you
 * should always set `DATABASE_URL` so that Neon can connect via the pooler.
 */
const createPrismaClient = (): PrismaClient => {
  if (!connectionString) {
    console.warn(
      '⚠️ DATABASE_URL missing. Falling back to default PrismaClient. Builds may fail if DB access is needed.'
    );
    return new PrismaClient();
  }
  // Create a connection pool for Neon; this is required for serverless function scaling.
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  return new PrismaClient({ adapter });
};

// Reuse the Prisma client across hot reloads in development to avoid exhausting database connections.
export const prisma: PrismaClient = (globalThis as any).prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).prisma = prisma;
}
