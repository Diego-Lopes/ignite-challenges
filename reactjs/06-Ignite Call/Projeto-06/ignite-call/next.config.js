/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  images: {
    domains: ["images.prismic.io", "localhost", "lh3.googleusercontent.com/a/"],
  },
}

module.exports = nextConfig
