export const getAllAudioTypes = async ({ lang }: { lang: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/audio-book/type?language=${lang}`,
      {
        cache: "no-cache",
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

interface FileSize {
  bytes: number;
  kb: string;
  mb: string;
  gb: string;
}

interface AudioFile {
  id: string;
  file_name: string;
  file_path: string;
  is_image: boolean;
  is_audio: boolean | null;
  duration: number | null;
  content_type: string;
  extension: string;
  file_size: FileSize;
  createdAt: string;
  updatedAt: string;
}

interface AudioBookItem {
  id: string;
  name: string;
  audio_id: string;
  audio: AudioFile;
  author_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AudioBookDetailType {
  id: string;
  name: string;
  slug: string;
  image: AudioFile;
  year: number;
  count_of_audio: number;
  total_duration: number;
  audio_books: AudioBookItem[];
  createdAt: string;
  updatedAt: string;
}

export const getAudioBookDetailBySlug = async (
  slug: string,
  language: string = "ru",
): Promise<AudioBookDetailType> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/audio-book/type/${slug}?language=${language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch audiobook detail. Status: ${res.status}`,
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error in getAudioBookDetailBySlug:", error);
    throw error;
  }
};
