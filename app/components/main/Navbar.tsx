"use client";
import React, {useEffect, useState} from "react";
import logo from "@/public/logo-colorful 1.svg";
import search from "@/public/Vector.svg";
import Image from "next/image";
import Link from "next/link";
import {RiMenu3Fill} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store/Store";
import {closeMenu, openMenu} from "@/lib/slice/navbar.slice";
import {AiOutlineClose} from "react-icons/ai";
import {usePathname, useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {Dropdown, MenuProps, Space} from "antd";
import {IoMdArrowDropdown} from "react-icons/io";
import {MdAccountCircle} from "react-icons/md";

const Navbar = () => {
    const isOpen = useSelector((state: RootState) => state.navbar.isOpen);
    const menuItems = useSelector((state: RootState) => state.navbar.menuItems);
    const dropDownItems: Array<any> = useSelector(
        (state: RootState) => state.navbar.dropDowniItems
    );
    const pathname = usePathname();
    const dispatch = useDispatch();
    const phoneNumber = Cookies.get("phone");
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        setToken(accessToken || null);
    }, [pathname]);

    // Menu ochilganda scrollni bloklash va blur qo'shish
    useEffect(() => {
        const body = document.body;
        const content = document.getElementById("content"); // Sahifaning content qismini blur qilish

        if (isOpen) {
            body.classList.add("no-scroll");
            if (content) content.classList.add("blur");
        } else {
            body.classList.remove("no-scroll");
            if (content) content.classList.remove("blur");
        }

        return () => {
            body.classList.remove("no-scroll");
            if (content) content.classList.remove("blur");
        };
    }, [isOpen]);

    const handleLogout = () => {
        Cookies.remove("access_token");
        setToken(null);
        router.push("/");
    };

    const handleNavigateToProfile = () => {
        router.push("/profile");
    };

    const handleChildClick: MenuProps["onClick"] = ({key}) => {
        switch (key.toString()) {
            case "1":
                return handleNavigateToProfile();
            case "2":
                return handleLogout();
            case "3":
                return router.push("/createarticle");
        }
    };

    const handleOutsideClick = (e: MouseEvent) => {
        // Agar click menudan tashqariga bosilsa, menyuni yopish
        const menuElement = document.getElementById("menu");
        if (menuElement && !menuElement.contains(e.target as Node)) {
            dispatch(closeMenu());
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isOpen]);

    if (pathname === "/login" || pathname === "/register") return null;

    return (
        <nav className="py-2">
            <div className="container">
                <div className="flex items-center justify-between">
                    <Link href={"/"}>
                        <Image src={logo} alt="nav logo"/>
                    </Link>
                    <div className="flex items-center gap-14">
                        <ul
                            id="menu"
                            className={`max-lg:fixed justify-center ${
                                !isOpen ? "max-lg:-right-[100%]" : "max-lg:right-0"
                            } max-lg:bg-white max-lg:h-screen max-lg:w-2/3 max-lg:flex-col max-lg:top-0 transition-all ease-in-out z-50 flex items-center gap-12`}
                        >
                            <AiOutlineClose
                                onClick={() => dispatch(closeMenu())}
                                className="z-10 absolute max-lg:block hidden top-4 right-4"
                            />
                            {menuItems?.map((item, index) => (
                                <li
                                    onClick={() => dispatch(closeMenu())}
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
                                <Image src={search} alt="search"/>
                            </Link>
                            {token ? (
                                <div className="flex items-center gap-2">
                                    <Dropdown
                                        className="font-semibold text-blue-500 cursor-pointer"
                                        trigger={["click"]}
                                        menu={{items: dropDownItems, onClick: handleChildClick}}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            <div className="items-center gap-2 flex justify-between">
                                                <MdAccountCircle className="text-4xl text-blue-600"/>
                                                <div className="flex items-center gap-2 block max-sm:hidden">
                                                    {phoneNumber}
                                                    <IoMdArrowDropdown className="text-xl text-blue-600"/>
                                                </div>
                                            </div>
                                        </a>
                                    </Dropdown>
                                </div>
                            ) : (
                                <Link href={"/register"} className="max-sm:fixed z-[300] w-full left-0 bottom-0">
                                    <button
                                        className="bg-blue-600 px-4 text-white max-sm:w-full py-1 rounded text-[20px] max-sm:rounded-none font-bold max-sm:text-[17px] max-sm:px-2 max-sm:py-4">
                                        Maqola yuborish
                                    </button>
                                </Link>
                            )}

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
