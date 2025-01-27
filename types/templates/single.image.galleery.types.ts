interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}

export interface ImageDetails {
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

export interface ImageData {
  image_id: string;
  image: ImageDetails;
}

export interface ImageProps {
  images: ImageData[];
}
