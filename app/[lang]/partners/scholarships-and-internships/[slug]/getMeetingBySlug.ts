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
        client_ip_address: clientIpAddress, // Faqat kerakli headerni qo'shish
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data for slug: ${slug}`);
  }

  return await response.json();
};

export { getMeetingBySlug };
