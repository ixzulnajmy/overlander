/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ['*'] }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.3dicons.com',
        pathname: '/packs/**',
      },
    ],
  },
};
export default nextConfig;
