/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dk4wxo8wc/**',
      },
    ],
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules/, message: /Critical dependency/ },
    ];
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.redaezziani.com/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
