const getEventBySlug = async (slug: string, lang: string, clientIp = "") => {
  try {
    console.log(slug, lang);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/meeting/${slug}?language=${lang}`,
      {
        cache: "no-cache",
        headers: {
          "x-api-key": clientIp,
        },
      },
    );

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch event by slug:", error);
    return null;
  }
};

export { getEventBySlug };
