// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost:3000',
    '192.168.173.181:3000'
  ],
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/api/v1/trademark/:path*',
          destination: 'http://localhost:8000/api/v1/trademark/:path*',
        },
      ],
    };
  },
};

export default nextConfig;