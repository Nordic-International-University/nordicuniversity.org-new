import { ImageFile } from "@/types/templates/nordiklieve.types";

export interface CodesAndManualsProps {
  id: string;
  file_id: string;
  image_id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  image: ImageFile;
  file: ImageFile;
}
