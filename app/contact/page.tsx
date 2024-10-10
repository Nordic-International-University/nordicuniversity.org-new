import React from "react";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import image from "@/public/Ellipse 793.png";
import image2 from "@/public/Ellipse 794.png";
import Image from "next/image";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";

export const metadata = {
  title: "Biz bilan bog'lanish | Nordic International University",
  description:
    "Nordic International University bilan bog'lanish uchun tafsilotlar: telefon raqami, email, manzil va ijtimoiy tarmoqlar. Toshkent, Chilonzor tumani, Bunyodkor ko‘chasi, 8/2.",
  openGraph: {
    title: "Biz bilan bog'lanish | Nordic International University",
    description:
      "Nordic International University bilan bog'lanish uchun tafsilotlar: telefon raqami, email, manzil va ijtimoiy tarmoqlar. Toshkent, Chilonzor tumani, Bunyodkor ko‘chasi, 8/2.",
    images: [
      {
        url: "/Ellipse 793.png",
        width: 800,
        height: 600,
        alt: "Nordic International University binosi rasmi",
      },
    ],
  },
};

const Contact = () => {
  return (
    <section id="contact" className="mt-[25px] max-sm:mt-[20px]">
      <article className="container">
        <h2 className="text-[32px] max-sm:text-[24px] font-bold leading-[53px] tracking-[-1px] text-[#042552]">
          <RoundedSvg title="Biz bilan bog'lanish" />
        </h2>
        <div className="mt-3">
          <div className="flex max-xl:flex-col w-full gap-3 rounded-md p-[10px] items-start justify-center">
            <div className="bg-[#46658B] w-full relative rounded-xl max-sm:pl-[20px] pl-[40px] py-12">
              <div className="flex mb-[80px] max-sm:gap-[40px] gap-[50px] flex-col">
                <div className="flex gap-[25px] max-sm:gap-3 items-center">
                  <FaUser className="w-6 h-6 text-white" />
                  <a
                    className="text-white text-base font-normal"
                    href="tel:+99855 508 44 00"
                  >
                    Tahrir kengashi mas’ul kotibi: Oybek Raximberdiyev
                  </a>
                </div>
                <div className="flex gap-[25px] max-sm:gap-3 items-center">
                  <FaPhone className="w-6 h-6 text-white" />
                  <a
                    className="text-white text-base font-normal"
                    href="tel:+99855 508 44 00"
                  >
                    +998 90 215 56 55
                  </a>
                </div>
                <div className="flex gap-[25px] max-sm:gap-3 items-center">
                  <MdEmail className="w-6 h-6 text-white" />
                  <a
                    className="text-white text-base font-normal"
                    href="mailto:nordicejournal@gmail.com"
                  >
                    nordicejournal@gmail.com
                  </a>
                </div>
                <div className="flex gap-[25px] max-sm:gap-3 items-center">
                  <FaLocationDot className="w-6 h-6 text-white" />
                  <a
                    className="text-white text-base font-normal"
                    href="https://maps.app.goo.gl/9Lzhu9Mk4dGnYqLn8"
                    target="_blank"
                  >
                    Toshkent shahar, Chilonzor tumani, Bunyodkor ko‘chasi, 8/2
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-[24px]">
                <div className="bg-primary flex items-center hover:bg-white transition-all group justify-center w-[35px] h-[35px] rounded-full">
                  <a
                    href="https://www.youtube.com/@nordic_university"
                    target="_blank"
                  >
                    <FaInstagram className="text-white text-xl group-hover:text-black" />
                  </a>
                </div>
                <div className="bg-primary flex items-center hover:bg-white transition-all group justify-center w-[35px] h-[35px] rounded-full">
                  <a href="https://t.me/nordic_edu" target="_blank">
                    <FaTelegram className="text-white text-xl group-hover:text-black" />
                  </a>
                </div>
                <div className="bg-primary flex items-center hover:bg-white transition-all group justify-center w-[35px] h-[35px] rounded-full">
                  <a
                    href="https://www.facebook.com/nordicuniversity.edu/?ref=pages_you_manage"
                    target="_blank"
                  >
                    <FaFacebook className="text-white text-xl group-hover:text-black" />
                  </a>
                </div>
              </div>
              <Image src={image} className="absolute bottom-0 right-0" alt="" />
              <Image
                src={image2}
                className="absolute bottom-20 right-16"
                alt=""
              />
            </div>
            <div className="w-[1250px] max-xl:w-full max-xl:gap-4 max-md:flex-col max-xl:flex">
              <div className="relative h-[456px] group rounded-md w-full overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23977.31661227081!2d69.21817961753031!3d41.305283213841385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b359ab47501%3A0x618cedae4747d331!2sNordic%20International%20University!5e0!3m2!1sru!2s!4v1723535500885!5m2!1sru!2s"
                  width="600"
                  style={{ border: "none" }}
                  allowFullScreen={false}
                  loading="lazy"
                  className="w-full h-full"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute max-sm:hidden inset-0 group-hover:left-[100%] bg-black bg-opacity-40 flex items-center justify-center text-white opacity-100 transition-all duration-300">
                  <h2 className="text-xl -tracking-tighter group-hover:hidden">
                    {" "}
                    Chilonzor filiali{" "}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Contact;
