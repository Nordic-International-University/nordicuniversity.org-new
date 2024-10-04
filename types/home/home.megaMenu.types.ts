interface megaMenu {
  name: string;
  url: string;
}

export interface megaMenuProps {
  subItems: Array<megaMenu>;
  itemName: string;
}
