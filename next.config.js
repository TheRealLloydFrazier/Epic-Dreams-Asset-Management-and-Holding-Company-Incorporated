/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TODO: Set to false once all TypeScript errors are resolved
    // Run `npx tsc --noEmit` to see current errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // TODO: Set to false once ESLint errors are resolved
    // Run `npm run lint` to see current warnings
    ignoreDuringBuilds: true,
  },
  // Skip static generation for API routes during build
  // This allows development to continue without Prisma/database connectivity
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000']
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

module.exports = nextConfig;
