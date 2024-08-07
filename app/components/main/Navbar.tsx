import React from "react";
import logo from "@/public/logo-colorful 1.svg";
import earth from "@/public/Frame.svg";
import search from "@/public/Vector.svg";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <Image src={logo} alt="nav logo" />
          <div className="flex items-center gap-14">
            <ul className="flex items-center gap-12">
              <Link href={""}>
                <li className="text-[#6C758F] text-[18px] font-[700]">
                  Jurnal haqida
                </li>
              </Link>
              <Link href={""}>
                <li className="text-[#6C758F] text-[18px] font-[700]">
                  Yo’riqnoma
                </li>
              </Link>
              <Link href={""}>
                <li className="text-[#6C758F] text-[18px] font-[700]">
                  Nashrlar
                </li>
              </Link>
              <Link href={""}>
                <li className="text-[#6C758F] text-[18px] font-[700]">
                  Asosiy yo’nalishlar
                </li>
              </Link>
              <Link href={""}>
                <li className="text-[#6C758F] text-[18px] font-[700]">
                  Bog’lanish
                </li>
              </Link>
            </ul>
            <div className="flex items-center gap-8">
              <Image src={earth} alt="earth" />
              <Image src={search} alt="search" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
