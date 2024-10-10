"use client";
import React, { useEffect, useRef, useState } from "react";
import logo from "@/public/logo-colorful 1.svg";
import search from "@/public/Vector.svg";
import Image from "next/image";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/Store";
import { closeMenu, openMenu } from "@/lib/slice/navbar.slice";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Dropdown, MenuProps } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import gsap from "gsap";

const Navbar = () => {
  const isOpen = useSelector((state: RootState) => state.navbar.isOpen);
  const menuItems = useSelector((state: RootState) => state.navbar.menuItems);
  const dropDownItems: Array<any> = useSelector(
    (state: RootState) => state.navbar.dropDowniItems,
  );
  const pathname = usePathname();
  const dispatch = useDispatch();
  const phoneNumber = Cookies.get("phone");
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAtTop(currentScrollY === 0);

      if (currentScrollY > lastScrollY) {
        setShowHeader(false); // Pastga scroll qilganda headerni yashirish
      } else {
        setShowHeader(true); // Yuqoriga scroll qilganda headerni ko'rsatish
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const items = menuRef.current.querySelectorAll("li");
      // Clear previous animations if any
      gsap.killTweensOf(items);

      // Set initial state
      gsap.set(items, { y: -20, opacity: 0 });

      // Animate each <li> item separately with a stagger effect
      gsap.to(items, {
        y: 0,
        opacity: 1,
        stagger: 0.15, // Stagger each item by 0.15 seconds
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isOpen]);
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    setToken(accessToken || null);
  }, [pathname]);

  useEffect(() => {
    const body = document.body;
    const content = document.getElementById("content");

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

  const handleChildClick: MenuProps["onClick"] = ({ key }) => {
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
    const menuElement = document.getElementById("menu");
    if (menuElement && !menuElement.contains(e.target as Node)) {
      dispatch(closeMenu());
    }
  };

  const [hoverDirection, setHoverDirection] = useState("from-left");

  const handleMouseEnter = (e: any) => {
    const boundingBox = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX;

    if (mouseX - boundingBox.left < boundingBox.width / 2) {
      setHoverDirection("from-left");
    } else {
      setHoverDirection("from-right");
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

  const handleMouseLeave = () => {
    setHoverDirection(
      hoverDirection === "from-left" ? "from-right" : "from-left",
    );
  };

  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <nav
      className={`lg:sticky lg:top-0 lg:left-0 w-full py-2 lg:transition-transform lg:duration-300 z-50 ${
        atTop ? "" : "bg-white shadow-md"
      } ${showHeader ? "lg:transform lg:translate-y-0" : "lg:transform lg:-translate-y-full"}`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image src={logo} className="max-sm:w-32" alt="nav logo" />
          </Link>
          <div className="flex items-center gap-14">
            <ul
              ref={menuRef}
              id="menu"
              className={`max-lg:fixed justify-center max-sm:shadow-2xl px-3 max-sm:rounded-l-xl ${
                !isOpen ? "max-lg:-right-[100%]" : "max-lg:right-0"
              } max-lg:bg-white max-lg:h-screen max-lg:w-2/3 max-lg:flex-col max-lg:top-0 transition-all ease-in-out z-[700] flex items-center max-sm:pb-96 max-sm:gap-2 gap-2`}
            >
              <AiOutlineClose
                onClick={() => dispatch(closeMenu())}
                className="z-10 absolute text-[#0196e3] text-xl max-lg:block hidden top-4 right-4"
              />
              {menuItems.map((item, index) => (
                <li
                  onClick={() => dispatch(closeMenu())}
                  key={index}
                  className={`relative group ${pathname === item.path ? "max-sm:border-b-sky-800" : "max-sm:border-b-[#0196e3]"}  max-sm:border-b-[2px] max-sm:w-full px-4 text-[18px] font-[700] pb-2 ${
                    pathname === item.path ? "text-sky-700" : ""
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={item.path} className="relative">
                    <div className="flex text-md items-center pt-2 gap-2">
                      <div className="max-sm:block hidden">{item.icon}</div>
                      <div>
                        {item.name}
                        <span
                          className={`absolute max-sm:hidden block -bottom-1 h-0.5 bg-sky-700 transition-transform duration-300 ${
                            hoverDirection === "from-left"
                              ? "left-0 group-hover:right-0 group-hover:left-auto"
                              : "right-0 group-hover:left-0 group-hover:right-auto"
                          } w-full transform scale-x-0 group-hover:scale-x-100 origin-${
                            hoverDirection === "from-left" ? "left" : "right"
                          } ${pathname === item.path ? "scale-x-100" : ""}`}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-8 max-sm:gap-3">
              <Link href={"/search"}>
                <Image src={search} alt="search" />
              </Link>
              {token && (
                <div className="flex items-center gap-2">
                  <Dropdown
                    className="font-semibold text-blue-500 cursor-pointer"
                    trigger={["click"]}
                    menu={{ items: dropDownItems, onClick: handleChildClick }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <div className="items-center gap-2 flex justify-between">
                        <MdAccountCircle className="text-4xl text-blue-600" />
                        <div className="flex items-center gap-2 block max-sm:hidden">
                          {phoneNumber}
                          <IoMdArrowDropdown className="text-xl text-blue-600" />
                        </div>
                      </div>
                    </a>
                  </Dropdown>
                </div>
              )}
              {pathname !== "/createarticle" && (
                <Link
                  href={token ? "/createarticle" : "/register"}
                  className={`max-sm:fixed z-[300] w-full left-0 bottom-0 ${token ? "hidden max-sm:block" : "block"}`}
                >
                  <button className="bg-blue-600 px-4 text-white max-sm:w-full py-1 rounded text-[20px] max-sm:rounded-none font-bold max-sm:text-[17px] max-sm:px-2 max-sm:py-4">
                    {token ? "Maqola yuborish" : "Hisobga kirish"}
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
      {isOpen && (
        <div
          id="content"
          className="w-screen h-screen fixed z-[699] top-0 bg-white bg-opacity-50 backdrop-blur-sm"
        >
          {/* Asosiy sahifa kontenti */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
