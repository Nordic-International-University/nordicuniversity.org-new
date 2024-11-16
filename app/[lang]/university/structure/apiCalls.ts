import {
  SectionType,
  structureBySLug,
  structureByType,
  UniversitySection,
} from "@/types/templates/structure.types";

const getAllStructureTypes = async (
  lang: string,
): Promise<UniversitySection[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/org-structure-types?language=${lang}`,
  );
  const json = await response.json();
  return json;
};

const getAllStructureByType = async (
  lang: string,
  structureType: SectionType,
): Promise<structureByType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/org-structures/user?type=${structureType}&language=${lang}`,
  );
  const json = await response.json();
  return json;
};

const getAllStructuresBySlug = async (
  lang: string,
  slug: string,
): Promise<structureBySLug[] | structureBySLug> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/org-structures/user/${slug}/?language=${lang}`,
  );
  const json = await response.json();
  return json;
};

export { getAllStructuresBySlug, getAllStructureByType, getAllStructureTypes };
