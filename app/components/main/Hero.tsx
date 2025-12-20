import logo from "@/public/university_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("socialMediaCard.hero");

  return (
    <header className="top-calc">
      <Image
        width={300}
        className="absolute z-[9] left-[50%] translate-x-[-50%] top-[50%]"
        src={logo}
        alt="logo"
      />

      {/* Buttons Container */}
      <div className="absolute z-[10] top-[60%] sm:top-[65%] w-full flex justify-center gap-4 sm:gap-10 px-4">
        <a
          href="/Training Schedule CONNECT Programme 2026.pdf"
          download
          className="border border-white/50 bg-black/20 backdrop-blur-sm text-white px-6 py-2 rounded hover:bg-white hover:text-black transition-all text-center uppercase font-bold text-xs sm:text-sm tracking-wide"
        >
          {t("download_program")}
        </a>
        <Link
          href="/partners/dynamic/utara-universiteti-malayziya-bilan-hamkorlik"
          className="border border-white/50 bg-black/20 backdrop-blur-sm text-white px-6 py-2 rounded hover:bg-white hover:text-black transition-all text-center uppercase font-bold text-xs sm:text-sm tracking-wide"
        >
          {t("about_program")}
        </Link>
      </div>

      <video
        className="w-full absolute  top-0 h-screen object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <track
          label="Tavsiflar"
          kind="descriptions"
          src="/video/description.vtt"
          default
        />
        <source src="/video/video2.mp4" type="video/mp4" />
        Sizning brauzeringiz videoni qo'llab-quvvatlamaydi.
      </video>
    </header>
  );
};

export default Hero;
