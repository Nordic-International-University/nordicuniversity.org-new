"use client"
import React from "react";
import {usePathname} from "next/navigation";

const Footer = () => {
    const pathname=usePathname()
    if(pathname==="/login"||pathname==="/register") return null;
  return (
    <div className="container">
      <p className="text-center font-[700]">
        © 2024 - Xalqaro Nordik universiteti tomonidan qo‘llab quvvatlanadi
      </p>
    </div>
  );
};

export default Footer;
