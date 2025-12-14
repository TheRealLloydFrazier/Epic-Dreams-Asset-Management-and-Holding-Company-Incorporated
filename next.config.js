/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove ignoreBuildErrors so that type errors fail the build instead of silently being ignored.
  // This ensures the application doesn't deploy with broken TypeScript types.
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  eslint: {
    // Also ignore ESLint during builds for now
    ignoreDuringBuilds: true,
  },
  // Re-enable font optimization for better performance and smaller font downloads.
  optimizeFonts: true,
  // Skip static generation for API routes during build
  // This allows development to continue without Prisma/database connectivity
  output: 'standalone',
  experimental: {
    serverActions: {
      allowOrigins: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000']
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
};

module.exports = nextConfig;
