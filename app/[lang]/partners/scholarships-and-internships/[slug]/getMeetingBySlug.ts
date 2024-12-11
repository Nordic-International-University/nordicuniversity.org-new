const getMeetingBySlug = async (slug: string, lang: string, headers = {}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/cooperation/meeting/${slug}?language=${lang}`,
    {
      cache: "no-cache",
      headers,
    },
  );
  return await response.json();
};

export { getMeetingBySlug };
