import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "journal2.nordicun.uz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.nordicuniversity.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        // Google verification fayllarini redirectdan chiqarib tashlash
        source: "/google*.html",
        destination: "/google-verification",
        permanent: false,
      },
      {
        // Boshqa .html fayllar uchun redirect
        source: "/:path*.html",
        has: [
          {
            type: "query",
            key: "google",
            value: "true",
          },
        ],
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
