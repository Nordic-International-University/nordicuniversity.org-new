const getMeetingBySlug = async (slug: string, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/cooperation/meeting/${slug}?language=${lang}`,
    {
      cache: "no-cache",
    },
  );
  return await response.json();
};

export { getMeetingBySlug };
