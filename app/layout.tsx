import type { Metadata } from "next";
import {Bellota_Text} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/main/Navbar";
import React from "react";
import StoreProvider from "@/lib/provider/StoreProvider";
import Footer from "@/app/components/main/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Bellota_Text({ subsets: ["latin"], weight: ['400','700'],});

export const metadata: Metadata = {
  title: "Nordic University Journal",
  description: "Xalqaro Nordic universiteti ilmiy amaliy elektron jurnali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "BreadcrumbList",
                      "itemListElement": [
                          {
                              "@type": "ListItem",
                              "position": 1,
                              "name": "Jurnal haqida",
                              "item": "https://newjournal.nordicuniversity.org/about"
                          },
                          {
                              "@type": "ListItem",
                              "position": 2,
                              "name": "Yo’riqnoma",
                              "item": "https://newjournal.nordicuniversity.org/instruction"
                          },
                          {
                              "@type": "ListItem",
                              "position": 3,
                              "name": "Nashrlar",
                              "item": "https://newjournal.nordicuniversity.org/publications"
                          },
                          {
                              "@type": "ListItem",
                              "position": 4,
                              "name": "Asosiy yo’nalishlar",
                              "item": "https://newjournal.nordicuniversity.org/volumes"
                          },
                          {
                              "@type": "ListItem",
                              "position": 5,
                              "name": "Bog’lanish",
                              "item": "https://newjournal.nordicuniversity.org/contact"
                          }
                      ]
                  }),
              }}
          />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
      <StoreProvider>
          <div id="wrap">
              <Navbar/>
              <main id="main" className="overflow-x-hidden">
                  {children}
              </main>
              <Footer/>
          </div>
          <SpeedInsights/>
          <Analytics/>
      </StoreProvider>
      </body>
      </html>
  );
}
