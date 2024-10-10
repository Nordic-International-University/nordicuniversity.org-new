"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaInstagram, FaCopy } from "react-icons/fa";
import { message } from "antd";

const Page2 = ({ singleNews }: any) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(singleNews.body || "");
    message.success("Maqola nusxalandi");
  };

  return (
    <Suspense fallback={<div>loading</div>}>
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-start gap-6 mb-8"
        >
          <h1 className="text-3xl max-sm:block hidden max-sm:text-xl font-bold text-blue-900">
            {singleNews.title}
          </h1>
          <Image
            width={600}
            height={400}
            src={
              singleNews?.source?.file_path
                ? `${process.env.NEXT_PUBLIC_API_URL}${singleNews?.source?.file_path}`
                : "/path/to/default-image.jpg"
            }
            alt={singleNews.title}
            className="rounded-lg shadow-lg"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl max-sm:hidden block max-sm:text-xl font-bold mb-4 text-blue-900">
              {singleNews.title}
            </h1>
            <p className="text-gray-600 max-sm:text-justify">
              {singleNews.description}
            </p>
            <p className="text-lg text-gray-700 max-sm:text-justify mt-4 leading-relaxed">
              {singleNews.body}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex gap-4 justify-center max-sm:justify-start lg:justify-start items-center mt-6"
        >
          <a
            href={`https://t.me/share/url?url=https://journal.nordicuniversity.org/news/${singleNews.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <FaTelegramPlane />
            <p className="max-sm:hidden block">Telegramga ulashish</p>
          </a>

          <a
            href={`https://www.instagram.com/?url=https://journal.nordicuniversity.org/news/${singleNews.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <FaInstagram />
            <p className="max-sm:hidden block"> Instagramga ulashish</p>
          </a>
          <button
            onClick={handleCopy}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <FaCopy />
            <p className="max-sm:hidden block">Matnni nusxalash</p>
          </button>
        </motion.div>
      </div>
    </Suspense>
  );
};

export default Page2;
