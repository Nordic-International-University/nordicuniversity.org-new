const getSubPages = async (lang: string, pageKey: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/subpages/${pageKey}?language=${lang}`,
      {},
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export { getSubPages };
