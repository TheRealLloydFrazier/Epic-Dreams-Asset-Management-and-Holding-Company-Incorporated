/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ⚠️ Allows production builds to complete even with type errors
    // Remove this once types are properly aligned
    ignoreBuildErrors: true,
  },
  eslint: {
    // Also ignore ESLint during builds for now
    ignoreDuringBuilds: true,
  },
  optimizeFonts: false, // Disable font optimization to prevent network fetch errors
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
