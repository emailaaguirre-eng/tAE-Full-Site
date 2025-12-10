/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows images from any domain (you can restrict to your WordPress domain)
      },
    ],
  },
}

module.exports = nextConfig

