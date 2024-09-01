"use client";
import React, { useState } from "react";
import logo from "@/public/logo-colorful 1.svg";
import search from "@/public/Vector.svg";
import Image from "next/image";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/Store";
import { closeMenu, openMenu } from "@/lib/slice/navbar.slice";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const isOpen = useSelector((state: RootState) => state.navbar.isOpen);
  const menuItems = useSelector((state: RootState) => state.navbar.menuItems);
  const pathname = usePathname();

  const dispatch = useDispatch();

  // Navbarni login va register sahifalarida ko'rsatmaslik
  if (pathname === "/login" || pathname === "/register") return null;

  return (
      <nav className="py-2">
        <div className="container">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <Image src={logo} alt="nav logo" />
            </Link>
            <div className="flex items-center gap-14">
              <ul
                  className={`max-lg:fixed justify-center ${
                      !isOpen ? "max-lg:-right-[100%]" : "max-lg:right-0"
                  } max-lg:bg-white max-lg:h-screen max-lg:w-2/3 max-lg:flex-col max-lg:top-0 transition-all ease-in-out z-10 flex items-center gap-12`}
              >
                <AiOutlineClose
                    onClick={() => dispatch(closeMenu())}
                    className="z-10 absolute max-lg:block hidden top-4 right-4"
                />
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`text-[#6C758F] text-[18px] font-[700] ${
                            item.active ? "active-class" : ""
                        }`}
                    >
                      <Link href={item.path} prefetch={true}>
                        {item.name}
                      </Link>
                    </li>
                ))}
              </ul>
              <div className="flex items-center gap-8 max-sm:gap-3">
                <Link href={"/search"}>
                  <Image src={search} alt="search" />
                </Link>
                <Link href={'/register'}>
                  <button className="bg-blue-600 px-4 text-white py-2 rounded text-[20px] font-bold max-sm:text-[12px] max-sm:px-2 max-sm:py-1">
                    Submit Article
                  </button>
                </Link>

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
