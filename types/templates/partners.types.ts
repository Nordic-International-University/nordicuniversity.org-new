interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}

interface ImageDetails {
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

export interface PartnersType {
  id: string;
  name: string;
  link: string;
  image_id: string;
  createdAt: string;
  updatedAt: string;
  image: ImageDetails;
}

export interface Timetable {
  id: string;
  name: string;
  description: string;
  link: string;
  icon: Icon;
  createdAt: string;
  updatedAt: string;
}

interface Icon {
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
