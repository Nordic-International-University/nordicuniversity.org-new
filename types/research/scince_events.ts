interface social_links {
  social_name: string;
  url: string;
  alt: string;
}

export interface ResearchEvents {
  image_url: string;
  title: string;
  description: string;
  full_name: string;
  date: string;
  social_links: social_links[];
}

export interface buttonsType {
  label: string;
  onClick?: () => void;
  className: string;
}

export interface researchEventProps {
  props: ResearchEvents[];
  buttons: buttonsType[];
}
