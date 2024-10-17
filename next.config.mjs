/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "journal2.nordicun.uz",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap-:slug*.xml", // * belgisini qo'shib, barcha sitemaplarni qamrab olamiz
        destination: "/sitemap-:slug*.xml",
      },
    ];
  },
};

export default nextConfig;
