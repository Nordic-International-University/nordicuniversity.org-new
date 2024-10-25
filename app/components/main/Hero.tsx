import logo from "@/public/university_logo.svg";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="top-calc">
      <Image
        width={300}
        className="absolute z-[9] left-[50%] translate-x-[-50%] top-[50%]"
        src={logo}
        alt="logo"
      />
      <video
        className="w-full absolute top-0 h-screen object-cover"
        autoPlay={true}
        loop={true}
        muted={true}
      >
        <source src="/video/intro.mp4" type="video/mp4" />
        Sizning brauzeringiz videoni qo'llab-quvvatlamaydi.
      </video>
    </header>
  );
};

export default Hero;
