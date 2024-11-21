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

export interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}

export interface Image {
  id: string;
  file_name: string;
  file_path: string;
  is_image: boolean;
  content_type: string;
  extension: string;
  file_size: FileSize;
  createdAt: string;
  updatedAt: string;
}

export interface SocialNetworkLinks {
  facebook?: string;
  telegram?: string;
  youtube?: string;
  instagram?: string;
  twitter?: string;
}

export interface ScientificEvent {
  id: string;
  type: string;
  image_id: string;
  image: Image;
  name: string;
  description: string;
  body: string;
  slug: string;
  time: string;
  time_unix: string;
  speaker_name: string;
  social_network_links: SocialNetworkLinks[];
  createdAt: string;
  updatedAt: string;
}

export interface buttonsType {
  label: string;
  onClick?: () => void;
  className: string;
}

export interface researchEventProps {
  props: ResearchEvents[];
}
