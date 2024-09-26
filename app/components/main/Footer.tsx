"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {FaFacebook, FaInstagram, FaTelegram} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    const pathname = usePathname();
    if (pathname === "/login" || pathname === "/register") return null;

    return (
        <footer id="footer" className="bg-gray-400 mt-7 text-white py-5">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between max-md:flex-col">
                    <div className="flex items-center space-x-4">
                        <p className="font-bold max-sm:text-center text-md">
                            © 2024 - Xalqaro Nordik universiteti tomonidan qo‘llab-quvvatlanadi
                        </p>
                    </div>
                    <div className="flex justify-center space-x-6 max-md:mt-6">
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
                {/*<div className="mt-6 text-center">*/}
                {/*    <Link*/}
                {/*        href="/contact"*/}
                {/*        className="text-sm font-light text-white hover:text-orange-400 transition-colors duration-200"*/}
                {/*    >*/}
                {/*        Biz bilan bog‘lanish*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
        </footer>
    );
};

export default Footer;
