import { ReactNode } from "react";

export interface sideBarItemTypes {
  name: string;
  url: string;
}

export interface LayoutSidebarProps {
  children: ReactNode;
  sidebarItems: sideBarItemTypes[];
  sidebarTitle: string;
  broadCampItems: sideBarItemTypes[];
}
