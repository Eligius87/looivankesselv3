/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n : {
    locales: ['nl', 'en'],
    defaultLocale: 'nl',
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
      {
        protocol: 'https',
        hostname: 'bvywrgmguxjmwqevbevc.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'bvywrgmguxjmwqevbevc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
