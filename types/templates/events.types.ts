import { ImageFile } from "@/types/templates/nordiklieve.types";

export interface EventsTypes {
  title: string;
  description: string;
  date: string;
}

export interface ForumAndProjects {
  id: string;
  type: string;
  image_id: string;
  image: ImageFile;
  name: string;
  slug: string;
  description: string;
  body: string;
  time: string;
  time_unix: string;
  file_id: string;
  file: ImageFile;
  createdAt: string;
  updatedAt: string;
}

export interface EventsTypeProps {
  props: ForumAndProjects[];
  sectionTitle: string;
}
