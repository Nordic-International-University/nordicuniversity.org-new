"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/log.svg";
import {FaFacebook, FaInstagram, FaTelegram} from "react-icons/fa"; // logoni joylash

const Footer = () => {
    const pathname = usePathname();
    if (pathname === "/login" || pathname === "/register") return null;

    return (
        <footer id="footer" className="bg-blue-900 mt-7 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between max-md:flex-col">
                    {/* Logo va matn */}
                    <div className="flex items-center space-x-4">
                        <p className="font-bold max-sm:text-center text-md">
                            © 2024 - Xalqaro Nordik universiteti tomonidan qo‘llab-quvvatlanadi
                        </p>
                    </div>

                    {/* Ijtimoiy tarmoqlar */}
                    <div className="flex justify-center space-x-6 mt-4 max-md:mt-6">
                        <a
                            href="#"
                            className="text-white hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <FaFacebook/>
                            <span className="font-semibold">Facebook</span>
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <FaInstagram/>
                            <span className="font-semibold">Instagram</span>
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <FaTelegram/>
                            <span className="font-semibold">Telegram</span>
                        </a>
                    </div>
                </div>

                {/* Qo'shimcha ma'lumotlar qismi */}
                <div className="mt-6 text-center">
                    <p className="text-sm font-light">
                        Shartlar va Maxfiylik siyosati
                    </p>
                    <a
                        href="#"
                        className="text-sm font-light text-white hover:text-orange-400 transition-colors duration-200"
                    >
                        Biz bilan bog‘lanish
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
