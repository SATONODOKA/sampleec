/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopackを無効化してWebpackを使用
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
  // Netlify用の設定
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  // 静的エクスポート用（必要に応じて）
  output: 'export',
  distDir: 'out',
}

module.exports = nextConfig 