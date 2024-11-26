import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Use 'true' for 308 permanent redirects, 'false' for temporary
      },
    ];
  },
};

export default nextConfig;
