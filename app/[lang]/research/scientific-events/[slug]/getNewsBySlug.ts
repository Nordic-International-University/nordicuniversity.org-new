const getEventBySlug = async (slug: string, lang: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/meeting/${slug}?language=${lang}`,
      {
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch event by slug:", error);
    return null; // Return null or any fallback value if the request fails
  }
};

export { getEventBySlug };
