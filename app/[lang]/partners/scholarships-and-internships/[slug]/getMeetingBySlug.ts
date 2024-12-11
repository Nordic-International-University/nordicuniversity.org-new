const getMeetingBySlug = async (
  slug: string,
  lang: string,
  customHeaders: HeadersInit = {},
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/cooperation/meeting/${slug}?language=${lang}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: customHeaders,
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data for slug: ${slug}`);
  }

  return await response.json();
};

export { getMeetingBySlug };
