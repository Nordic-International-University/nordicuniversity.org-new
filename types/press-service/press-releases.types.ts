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

interface ISocialNetworkLinks {
  instagram: string | null;
  telegram: string | null;
  facebook: string | null;
  youtube: string | null;
  twitter: string | null;
  mail: string | null;
  linkedin: string | null;
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
  social_network_links: ISocialNetworkLinks;
  createdAt: string;
  updatedAt: string;
}
