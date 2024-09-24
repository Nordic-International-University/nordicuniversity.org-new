interface NavItem {
  path: string;
  name: string;
  active: boolean;
}

export interface navbarInitialState {
  isOpen: boolean;
  menuItems: Array<NavItem>;
  reFetch: boolean;
}
