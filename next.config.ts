/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com'],
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