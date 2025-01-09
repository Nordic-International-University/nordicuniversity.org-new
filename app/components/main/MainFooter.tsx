"use client";

import Logo from "@/public/university_logo.svg";
import footer_bg from "@/public/images/home-images/footer_bg.png";
import { Button, Input } from "antd";
import Link from "next/link";
import { Jacques_Francois_Shadow as JacquesFrancoisShadow } from "next/font/google";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SocialMedia from "@/app/components/UI/socialMedia";
import { useRouter } from "next/navigation";
import { getAllContacts } from "@/app/[lang]/university/contacts/sendMessage";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import { useTranslations } from "next-intl";
import UzTopRating from "@/app/components/UI/ratingCard";

const jacquesFrancoisShadow = JacquesFrancoisShadow({
  subsets: ["latin"],
  weight: "400",
});

const MainFooter = () => {
  const [inputText, setInputText] = useState("");
  const router = useRouter();
  const [data, setData] = useState<any>({
    phone_1: "",
    email_1: "",
  });
  const t = useTranslations("footer");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllContacts(getCurrentLangClient());
      setData(result);
    };
    fetchData();
  }, []);

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
                <Link className="text-white" href={`tel:${data.phone_1}`}>
                  {t("phone")}: {data.phone_1}
                </Link>
                <Link className="text-white" href={`mailto:${data.email_1}`}>
                  {t("email")}: {data.email_1}
                </Link>
              </div>
            </div>

            <div className="max-lg:mt-5">
              <h2
                className={`text-white text-4xl ${jacquesFrancoisShadow.className}`}
              >
                {t("excellence_in_teaching")}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputText.trim()) {
                    router.push(`/university/contacts?email=${inputText}`);
                  }
                }}
                className="flex max-sm:flex-col items-center gap-2 mt-7"
              >
                <Input
                  onChange={(e) => setInputText(e.target.value)}
                  className="rounded-sm py-2 max-sm:w-full"
                  placeholder="Mail@example.com"
                />
                <Button
                  htmlType="submit"
                  className="bg-text_tertiary max-sm:w-full rounded py-4 px-8 text-text_secondary font-semibold"
                  size="large"
                >
                  {t("send")}
                </Button>
              </form>
              <div className="flex mt-5 items-center justify-between">
                <Link
                  target="_blank"
                  className="underline text-white text-lg"
                  href={"https://old.nordicuniversity.org/"}
                >
                  {t("old")}
                </Link>
                <UzTopRating />
              </div>
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
              <h2 className="text-white text-center">{t("university_name")}</h2>
              <h2 className="text-white block max-lg:hidden">
                {t("rights_reserved")}
              </h2>
            </div>
            <h2 className="text-white block max-lg:hidden">
              {t("site_developers")}
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
