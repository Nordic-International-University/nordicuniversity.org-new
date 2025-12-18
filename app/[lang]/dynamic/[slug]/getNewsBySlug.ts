const getTemplateDataBySlug = async (
  slug: string,
  lang: string,
  clientIpAddress?: string,
) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/subpages/single/${slug}?language=${lang}`;

  console.log('Fetching SubPage data from:', apiUrl);

  const response = await fetch(apiUrl, {
    cache: "no-cache",
    headers: {
      "x-api-key": clientIpAddress || "",
    },
  });

  // Check content type before parsing
  const contentType = response.headers.get("content-type");
  console.log('SubPage API Response status:', response.status);
  console.log('SubPage API Response content-type:', contentType);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('SubPage API Error Response:', errorText.substring(0, 200));

    // Return null for 404 or other errors so the page can handle it gracefully
    return null;
  }

  // Validate that response is JSON
  if (!contentType || !contentType.includes("application/json")) {
    const responseText = await response.text();
    console.error('Non-JSON response received:', responseText.substring(0, 200));
    console.error('Backend API endpoint might not exist or is returning HTML. Check your backend server.');
    return null;
  }

  const data = await response.json();
  console.log('SubPage data received:', data);
  return data;
};

export { getTemplateDataBySlug };
