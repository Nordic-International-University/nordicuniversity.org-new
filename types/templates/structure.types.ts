import { ImageFile } from "@/types/templates/nordiklieve.types";

export enum SectionType {
  RECTORATE = "RECTORATE",
  OFFICES = "OFFICES",
  FACULTIES = "FACULTIES",
  DEPARTMENT = "DEPARTMENT",
  CENTRES = "CENTRES",
}

export interface UniversitySection {
  label: string;
  type: SectionType;
}

export interface structureByType {
  id: string;
  type: SectionType;
  name: string;
  slug: string;
  mission: string;
  image_id: string;
  image: ImageFile;
  staffs: any[];
  createdAt: string;
  updatedAt: string;
}

interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}

interface SocialNetworkLinks {
  instagram: string;
  telegram: string;
  facebook: string;
  youtube: string;
  twitter: string;
}

interface ResumeFile {
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

export interface Staff {
  id: string;
  full_name: string;
  image_id: string;
  image: ImageFile;
  description: string;
  position: string;
  social_network_links: SocialNetworkLinks;
  resume_file_id: string;
  resume_file: ResumeFile;
  createdAt: string;
  updatedAt: string;
}

export interface structureBySLug {
  id: string;
  type: string;
  name: string;
  slug: string;
  mission: string;
  image_id: string;
  image: ImageFile;
  staffs: Staff[];
  createdAt: string;
  updatedAt: string;
}

export interface singleStructurePageParams {
  params: {
    slug: string;
  };
}
