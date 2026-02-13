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
        source: "/:lang(uz|en|ru)/patents/:path*",
        destination: "/:lang/partners/:path*",
        permanent: true,
      },
      {
        source: "/public/Files/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
