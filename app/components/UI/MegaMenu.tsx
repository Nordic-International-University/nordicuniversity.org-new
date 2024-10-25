import React from "react";
import { megaMenuProps } from "@/types/home/home.megaMenu.types";
import Link from "next/link";
import memory from "@/public/svg/106794-200 1.svg";
import Image from "next/image";
import { Mirza } from "next/font/google";
import checkUniversity from "@/public/svg/1705517743911 4.svg";

const mirza = Mirza({
  weight: "400",
  subsets: ["latin"],
});

const MegaMenu = ({ subItems, itemName }: megaMenuProps) => {
  return (
    <>
      {subItems.length > 0 && (
        <div className="absolute left-1/2 pb-[44px] pt-[30px] transform -translate-x-1/2 mt-2 bg-white shadow-xl p-4 rounded opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-[62px] translate-y-36">
          <div
            className={`flex min-w-[1320px] items-center w-full justify-between px-4`}
          >
            <div className={`${mirza.className} flex flex-col`}>
              <div className="flex items-center gap-4">
                <Image src={memory} alt="memory" />
                <h2 className="text-[#46658B]">{itemName}</h2>
              </div>
              <div className="relative pt-[10px]">
                <p className="text-sm sticky z-20 text-[#001E4299] w-[300px]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic
                </p>
                <Image
                  className="absolute z-0 top-5 left-10"
                  src={checkUniversity}
                  alt="logo_"
                />
              </div>
            </div>
            <div>
              <ul className="grid grid-cols-2 grid-rows-2 w-full gap-x-6 gap-y-1">
                {subItems.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="border-b-[2px] w-[268px] text-md border-gray-300 py-1"
                  >
                    <Link className="text-[#001E42B2]" href={subItem.url}>
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MegaMenu;
