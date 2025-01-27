import { ImageData } from "@/types/templates/single.image.galleery.types";

export interface NewsItem {
  id: string;
  image_id: string;
  keywords: string;
  image: Image;
  title: string;
  description: string;
  viewsCount: number;
  body: string;
  slug: string;
  time: string;
  images: ImageData[];
  time_unix: number;
  createdAt: string;
  updatedAt: string;
}

interface Image {
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

interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}
