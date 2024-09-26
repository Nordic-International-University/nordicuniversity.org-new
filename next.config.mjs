/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'journal2.nordicun.uz',
            },
        ]
    }
};

export default nextConfig;
