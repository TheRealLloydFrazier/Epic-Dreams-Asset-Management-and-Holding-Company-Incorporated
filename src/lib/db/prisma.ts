import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a stub Prisma client for build-time when the real client isn't available
function createStubPrismaClient(): any {
  const stubMethod = (..._args: any[]) => {
    return {
      then: (resolve: any) => resolve([]),  // Return empty array instead of null
      catch: () => stubMethod(),
      finally: () => stubMethod(),
      ...createStubModel()
    };
  };

  const createStubModel = () => {
    return new Proxy({}, {
      get(_target, prop) {
        if (typeof prop === 'string') {
          return stubMethod;
        }
        return undefined;
      }
    });
  };

  return new Proxy({}, {
    get(_target, prop) {
      if (prop === '$connect' || prop === '$disconnect') {
        return () => Promise.resolve();
      }
      return createStubModel();
    }
  });
}

let prismaInstance: PrismaClient;

try {
  prismaInstance = globalThis.prisma || new PrismaClient();
} catch (error) {
  // Prisma client not properly generated, use stub for build
  console.warn('Prisma client not available, using stub for build');
  prismaInstance = createStubPrismaClient() as PrismaClient;
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
