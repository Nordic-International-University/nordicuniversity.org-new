import Head from "next/head";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import React from "react";
import TopNav from "@/app/components/main/top.nav";
import Nav from "@/app/components/main/nav";
import MainFooter from "@/app/components/main/MainFooter";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { StoreProvider } from "@/app/utils/provider/storeProvider";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { ConfigProvider } from "antd";
import uzLatn from "antd/locale/uz_UZ";
import ruLatn from "antd/locale/ru_RU";
import enLatn from "antd/locale/en_US";
import Script from "next/script";

const getAllResources = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/education/resources?language=${await getCurrentLangServer()}`,
    {
      cache: "no-cache",
    },
  );
  const json = await response.json();
  return json;
};

const getAllNetworks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/social-network?page=1&limit=4`,
    {
      cache: "no-cache",
    },
  );
  const json = await response.json();
  return json;
};

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nordik Xalqaro Universiteti - Bosh sahifa",
  description:
    "Nordik Xalqaro Universitetiga xush kelibsiz. Kelajakdagi global yetakchilar uchun innovatsion ta'lim va dinamik akademik muhitni kashf qiling.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Nordik Xalqaro Universiteti - Bosh sahifa",
    description:
      "Nordik Xalqaro Universitetining rasmiy veb-sahifasi. Kelajakdagi global yetakchilar uchun innovatsion ta'lim markazi.",
    url: "https://nordicuniversity.org",
    siteName: "Nordik Xalqaro Universiteti",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Xalqaro Nordik Universiteti kampusi",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xalqaro Nordik Universiteti - Bosh sahifa",
    description:
      "Xalqaro Nordik Universitetining rasmiy veb-sahifasi. Innovatsion ta'lim va global yetakchilik markazi.",
    images: ["/images/twitter-image.jpg"],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const messages = await getMessages();
  const networks = await getAllNetworks();
  const resources = await getAllResources();

  return (
    <html lang={params.lang}>
      <Head>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KQ46PHQB');
          `,
          }}
        />
        <meta
          name="google-site-verification"
          content="8FJy9noEZAx-f0QKd8R0mFWvBPxym2l_FD-jw1WgSOk"
        />
        <meta />
      </Head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KQ46PHQB');
          `,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQ46PHQB"
            height="0"
            width="0"
            style={{ display: "none", overflow: "hidden" }}
          ></iframe>
        </noscript>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9955H9XVNY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9955H9XVNY');
        `}
        </Script>
        <NextIntlClientProvider locale={params.lang} messages={messages}>
          <ConfigProvider
            locale={
              params.lang === "uz"
                ? uzLatn
                : params.lang === "en"
                  ? enLatn
                  : ruLatn
            }
          >
            <StoreProvider>
              <TopNav props={resources} networks={networks.data} />
              <Nav />
              <main className="flex-grow">{children}</main>
              <MainFooter />
            </StoreProvider>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
