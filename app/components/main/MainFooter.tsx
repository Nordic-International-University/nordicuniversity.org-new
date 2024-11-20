import Logo from "@/public/university_logo.svg";
import footer_bg from "@/public/images/home-images/footer_bg.png";
import { Button, Image, Input } from "antd";
import Link from "next/link";
import { Jacques_Francois_Shadow as JacquesFrancoisShadow } from "next/font/google";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import React from "react";

const jacquesFrancoisShadow = JacquesFrancoisShadow({
  subsets: ["latin"],
  weight: "400",
});

const MainFooter = () => {
  return (
    <footer className="bg-footer_gradient relative pt-14 pb-24 mt-16">
      <div className="container">
        <div className="flex items-start  max-lg:flex-col justify-between">
          <div>
            <Image width={233} src={Logo.src} alt="Logo" />
            <div className="flex gap flex-col gap-1 mt-11">
              <Link className="text-white" href="tel:+998902909212">
                Telefon: +99890 290 92 12
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
              Learning today - leading tomorrow
            </h2>
            <div className="flex items-center gap-2 mt-7">
              <Input
                className="rounded-sm py-2"
                placeholder="Mail@example.com"
              />
              <Button
                className="bg-text_tertiary rounded py-4 px-8 text-text_secondary font-semibold"
                size="large"
              >
                Yuborish
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-16 justify-center mt-12">
          <span className="block bg-white h-0.5 w-[250px]"></span>
          <div className="flex text-lg items-center text-white gap-3 max-sm:gap-1.5">
            <FaInstagram className="w-[30px] h-[30px]" />
            <span className="block bg-white h-[20px] w-[0.5px]"></span>
            <FaTelegram className="w-[30px] h-[30px]" />
            <span className="block bg-white h-[20px] w-[0.5px]"></span>
            <FaFacebook className="w-[30px] h-[30px]" />
            <span className="block bg-white h-[20px] w-[0.5px]"></span>
            <FaYoutube className="w-[30px] h-[30px]" />
          </div>
          <span className="block bg-white h-0.5 w-[250px]"></span>
        </div>
      </div>
      <img
        className="absolute object-cover w-full h-full top-0"
        src={footer_bg.src}
      />

      <div className="bg-dark_blue_color absolute bottom-0 w-full">
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
              Sayt ishlab chiquvchilari:Xalqaro Nordic Universiteti IT
              departamenti
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
