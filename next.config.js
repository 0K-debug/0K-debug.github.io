/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '.',
  trailingSlash: true,
  // No basePath needed for username.github.io repository
}

module.exports = nextConfig 