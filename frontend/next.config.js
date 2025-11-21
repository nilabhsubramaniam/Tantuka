/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: isProd ? '/Tantuka' : '',
    assetPrefix: isProd ? '/Tantuka' : '',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/**',
            },
        ],
        unoptimized: true, // Required for static export
    },
    // API and backend configuration
    publicRuntimeConfig: {
        apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    },
}

module.exports = nextConfig