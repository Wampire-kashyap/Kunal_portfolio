import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // @ts-expect-error Next.js config TS types sometimes miss this
  allowedDevOrigins: ['edginess-deprecate-dispatch.ngrok-free.dev'],
}

export default nextConfig
