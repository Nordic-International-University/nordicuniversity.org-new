"use client";

import Logo from "@/public/university_logo.svg";
import footer_bg from "@/public/images/home-images/footer_bg.png";
import { Button, Input } from "antd";
import Link from "next/link";
import { Jacques_Francois_Shadow as JacquesFrancoisShadow } from "next/font/google";
import React, { useState } from "react";
import Image from "next/image";
import SocialMedia from "@/app/components/UI/socialMedia";
import { useRouter } from "next/navigation";

const jacquesFrancoisShadow = JacquesFrancoisShadow({
  subsets: ["latin"],
  weight: "400",
});

const MainFooter = () => {
  const [inputText, setInputText] = useState("");
  const router = useRouter();

  return (
    <footer className="bg-footer_gradient relative pt-14 pb-24 mt-16">
      <img
        className="absolute object-cover w-full h-full top-0 z-0"
        src={footer_bg.src}
        alt="Footer Background"
      />

      <div className="relative z-10">
        <div className="container">
          <div className="flex items-start max-lg:flex-col justify-between">
            <div>
              <Image width={233} height={100} src={Logo.src} alt="Logo" />
              <div className="flex flex-col gap-1 mt-11">
                <Link className="text-white" href="tel:+998555084400">
                  Telefon: +998555084400
                </Link>
                <Link className="text-white" href="tel:+998902909212">
                  Email: info@nordicununiversity.org
                </Link>
              </div>
            </div>

            <div className="max-lg:mt-5">
              <h2
                className={`text-white text-4xl ${jacquesFrancoisShadow.className}`}
              >
                Nordic Excellence in teaching
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputText.trim()) {
                    router.push(`/university/contacts?email=${inputText}`);
                  }
                }}
                className="flex items-center gap-2 mt-7"
              >
                <Input
                  onChange={(e) => setInputText(e.target.value)}
                  className="rounded-sm py-2"
                  placeholder="Mail@example.com"
                />
                <Button
                  htmlType="submit"
                  className="bg-text_tertiary rounded py-4 px-8 text-text_secondary font-semibold"
                  size="large"
                >
                  Yuborish
                </Button>
              </form>
            </div>
          </div>
          <div className="flex items-center max-sm:gap-3 max-sm:justify-between gap-16 justify-center mt-12">
            <span className="block bg-white h-0.5 w-[250px]"></span>
            <SocialMedia color="white" />
            <span className="block bg-white h-0.5 w-[250px]"></span>
          </div>
        </div>
      </div>
      <div className="bg-dark_blue_color absolute bottom-0 w-full z-10">
        <div className="container">
          <div className="flex items-center max-lg:justify-center justify-between py-3">
            <div className="flex items-center gap-9">
              <h2 className="text-white text-center">
                Xalqaro nordik universiteti 2024
              </h2>
              <h2 className="text-white block max-lg:hidden">
                Barcha huquqlar himoyalangan
              </h2>
            </div>
            <h2 className="text-white block max-lg:hidden">
              Sayt ishlab chiquvchilari: IT departamenti
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
