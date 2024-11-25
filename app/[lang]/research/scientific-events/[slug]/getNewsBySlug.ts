const getEventBySlug = async (slug: string, lang: string) => {
  try {
    console.log(slug, lang);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/meeting/${slug}?language=${lang}`,
      {
        cache: "no-cache",
      },
    );

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch event by slug:", error);
    return null; // Return null or any fallback value if the request fails
  }
};

export { getEventBySlug };
