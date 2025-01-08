interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}

interface File {
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

export interface annualsItem {
  id: string;
  name: string;
  file: File;
  image: Image;
  createdAt: string;
  updatedAt: string;
}
