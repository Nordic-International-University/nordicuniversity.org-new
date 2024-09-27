import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/main/Navbar";
import React from "react";
import StoreProvider from "@/lib/provider/StoreProvider";
import Footer from "@/app/components/main/Footer";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/react";

const inter = Inter({subsets: ["latin"], weight: "400"});

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
