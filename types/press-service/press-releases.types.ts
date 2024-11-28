import { ImageFile } from "@/types/templates/nordiklieve.types";

export interface pressReleasesType {
  id: string;
  title: string;
  body: string;
  slug: string;
  time: string;
  time_unix: number;
  createdAt: string;
  updatedAt: string;
}

interface SocialNetworkLinks {
  instagram: string;
  telegram: string;
  youtube: string;
  twitter: string;
}

export interface podcastType {
  id: string;
  image_id: string;
  description: string;
  image: ImageFile;
  video_link: string;
  title: string;
  slug: string;
  hashtags: string;
  social_network_links: SocialNetworkLinks;
  createdAt: string;
  updatedAt: string;
}
