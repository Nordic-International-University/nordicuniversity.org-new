import React from "react";
import { LayoutSidebarProps } from "@/types/templates/layout.types";
import Link from "next/link";
import BroadCamp from "@/app/components/UI/broadCump";

const LeftSidebarAndComponent = ({
  children,
  sidebarItems,
  sidebarTitle,
}: LayoutSidebarProps) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link href={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div>
          <div>
            <h2>{sidebarTitle}</h2>
            <BroadCamp items={[""]} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default LeftSidebarAndComponent;
