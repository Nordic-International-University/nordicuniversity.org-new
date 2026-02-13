const getTemplateDataBySlug = async (
  slug: string,
  lang: string,
  clientIpAddress?: string,
) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/subpages/single/${slug}?language=${lang}`;

  const response = await fetch(apiUrl, {
    cache: "no-cache",
    headers: {
      "x-api-key": clientIpAddress || "",
    },
  });

  if (!response.ok) {
    return null;
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }

  const data = await response.json();
  return data;
};

export { getTemplateDataBySlug };