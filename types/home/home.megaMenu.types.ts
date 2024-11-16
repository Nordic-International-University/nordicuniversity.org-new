interface megaMenu {
  name: string;
  url: string;
}

export interface megaMenuProps {
  subItems: Array<megaMenu>;
  transKey: string;
  itemName: string;
}

export enum SectionTypeEnum {
  NEWS = "NEWS",
  SCIENCE_EVENTS = "SCIENCE_EVENTS",
  COOPERATION_CONNECTIONS = "COOPERATION_CONNECTIONS",
  NORMATIVE_DOCUMENTATION = "NORMATIVE_DOCUMENTATION",
  PHOTO_ALBUM = "PHOTO_ALBUM",
  PARTNERS = "PARTNERS",
  COOPERATION_FORUM_PROJECTS = "COOPERATION_FORUM_PROJECTS",
}
