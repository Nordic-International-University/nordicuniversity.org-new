"use client"
import React from "react";
import {usePathname} from "next/navigation";

const Footer = () => {
    const pathname=usePathname()
    if(pathname==="/login"||pathname==="/register") return null;
  return (
      <footer id="footer"  className="sticky-footer">
          <div className="container">
              <p className="text-center font-[700]">
                  © 2024 - Xalqaro Nordik universiteti tomonidan qo‘llab quvvatlanadi
              </p>
          </div>
      </footer>
  );
};

export default Footer;
