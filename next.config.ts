import { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
    webpack: (config: any) => {  // Explicitly typing the config parameter
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

export default nextConfig;
