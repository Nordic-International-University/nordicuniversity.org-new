export interface LitsenziyaPropsTypes {
  props: {
    [key: string]: Document[];
  };
  sectionTitle: string;
}

interface Document {
  id: string;
  file_id: string;
  image_id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  file: FileInfo;
  image: FileInfo;
  alt?: string;
}

interface FileInfo {
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
