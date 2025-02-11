const getTemplateDataBySlug = async (
  slug: string,
  lang: string,
  clientIpAddress?: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/subpages/single/${slug}?language=${lang}`,
    {
      cache: "no-cache",
      headers: {
        "x-api-key": clientIpAddress || "",
      },
    },
  );
  return await response.json();
};

export { getTemplateDataBySlug };
