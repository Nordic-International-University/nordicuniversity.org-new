interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}

export interface ImageFile {
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

export interface nordicLiveJournalProps {
  id: string;
  image_id: string;
  image: ImageFile;
  file_id: string;
  file: ImageFile;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface nordicLife<T> {
  data: Array<T>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
