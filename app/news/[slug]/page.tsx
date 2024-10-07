"use client"

import React from "react";
import { newsProps } from "@/types/news.types";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaInstagram, FaCopy } from "react-icons/fa";


const getNewsBySlug = async (slug: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/news?slug=${slug}&lang=uz`
    );
    return response.json();
};

const Page = async (params: newsProps) => {
    const singleNews = (await getNewsBySlug(params.params.slug)) || {};

    const handleCopy = () => {
        navigator.clipboard.writeText(singleNews.body || "");
        alert("Matn nusxalandi!");
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col lg:flex-row items-start gap-6 mb-8"
            >
                <Image
                    width={600}
                    height={400}
                    src={`${process.env.NEXT_PUBLIC_API_URL}${singleNews?.source?.file_path}`}
                    alt={singleNews.title}
                    className="rounded-lg shadow-lg"
                />
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.3}}
                    className="text-center lg:text-left"
                >
                    <h1 className="text-3xl font-bold mb-4 text-blue-900">
                        {singleNews.title}
                    </h1>
                    <p className="text-gray-600">{singleNews.description}</p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {singleNews.body}
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex gap-4 justify-center lg:justify-start items-center mt-6"
            >
                <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(
                        `${process.env.NEXT_PUBLIC_APP_URL}/news/${singleNews.slug}`
                    )}&text=${encodeURIComponent(singleNews.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                    <FaTelegramPlane />
                    Telegramga ulashish
                </a>

                <a
                    href={`https://www.instagram.com/?url=${encodeURIComponent(
                        `${process.env.NEXT_PUBLIC_APP_URL}/news/${singleNews.slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                    <FaInstagram />
                    Instagramga ulashish
                </a>
                <button
                    onClick={handleCopy}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                    <FaCopy />
                    Matnni nusxalash
                </button>
            </motion.div>
        </div>
    );
};

export default Page;
