import { ReactNode } from "react";

interface sideBarItemTypes {
  name: string;
  url: string;
}

export interface LayoutSidebarProps {
  children: ReactNode;
  sidebarItems: sideBarItemTypes[];
  sidebarTitle: string;
}
