import { ReactElement } from "react";

interface NavItem {
  path: string;
  name: string;
  active: boolean;
  icon: ReactElement;
}

interface dropDownInterface {
  key: string;
  label: string;
  disabled?: Boolean;
  extra?: any;
  icon?: any;
}

export interface navbarInitialState {
  isOpen: boolean;
  menuItems: Array<NavItem>;
  reFetch: boolean;
  dropDowniItems: Array<dropDownInterface>;
}
