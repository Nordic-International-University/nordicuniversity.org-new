const getEventBySlug = async (slug: string, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/meeting/${slug}?language=${lang}`,
    {
      cache: "no-cache",
    },
  );
  return await response.json();
};

export { getEventBySlug };
