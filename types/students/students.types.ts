export interface ItemImage {
  id: string;
  photo_id: string;
  createdAt: string;
  updatedAt: string;
  photo: Photo;
}

interface Photo {
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
