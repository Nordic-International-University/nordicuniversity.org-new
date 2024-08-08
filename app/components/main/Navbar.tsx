"use client";

import React from "react";
import logo from "@/public/logo-colorful 1.svg";
import earth from "@/public/Frame.svg";
import search from "@/public/Vector.svg";
import Image from "next/image";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/Store";
import { closeMenu, openMenu } from "@/lib/slice/navbar.slice";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const isOpen = useSelector((state: RootState) => state.navbar.isOpen);
  const dispatch = useDispatch();

  return (
    <nav className="py-2">
      <div className="container">
        <div className="flex items-center justify-between">
          <Image src={logo} alt="nav logo" />
          <div className="flex items-center gap-14">
            <ul
              className={`max-lg:fixed justify-center ${!isOpen ? "max-lg:-right-[100%]" : "max-lg:right-0"} max-lg:bg-white max-lg:h-screen max-lg:w-2/4 max-lg:flex-col max-lg:top-0 transition-all ease-in-out z-10 flex items-center gap-12`}
            >
              <AiOutlineClose
                onClick={() => dispatch(closeMenu())}
                className="z-10 absolute top-4 right-4"
              />
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
              <RiMenu3Fill
                onClick={() => dispatch(openMenu())}
                className="text-2xl hidden max-lg:block"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
