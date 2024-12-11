interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}

interface HeroImage {
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

interface CooperationPhotoModel {
  id: string;
  photo_type_id: string;
  photo_id: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  photo: Photo;
}

export interface CooperationPhotoGallery {
  id: string;
  hero_image_id: string;
  hero_image: HeroImage;
  name: string;
  slug: string;
  CooperationPhotosModel: CooperationPhotoModel[];
}

// Interface for file size details
interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}

// Interface for the image object
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

// Interface for social network links
interface SocialNetworkLinks {
  instagram: string;
  telegram: string;
  facebook: string;
}

// Main interface for the event
export interface Event {
  id: string;
  type: string;
  image_id: string;
  image: Image;
  name: string;
  file: Image;
  description: string;
  body: string;
  slug: string;
  time: string;
  viewsCount: number;
  time_unix: string;
  speaker_name: string;
  social_network_links: SocialNetworkLinks;
  createdAt: string;
  updatedAt: string;
  latestItems: Event[];
}
