const getMeetingBySlug = async (
  slug: string,
  lang: string,
  clientIpAddress = "",
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/cooperation/meeting/${slug}?language=${lang}`,
    {
      cache: "no-cache",
      headers: {
        "x-api-key": clientIpAddress,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data for slug: ${slug}`);
  }

  return await response.json();
};

export { getMeetingBySlug };
