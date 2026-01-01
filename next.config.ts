import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Only use temporarily for deployment.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Enable type checking during builds
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**', // In production, restrict this to your domain
      },
    ],
  },
}

export default withPayload(nextConfig)
