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
  output: 'standalone',
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
