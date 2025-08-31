/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopackを無効化してWebpackを使用
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
}

module.exports = nextConfig 