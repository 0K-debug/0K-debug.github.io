/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ok-debug.github.io',
  // If this is your username.github.io repo, you can remove basePath
}

module.exports = nextConfig 