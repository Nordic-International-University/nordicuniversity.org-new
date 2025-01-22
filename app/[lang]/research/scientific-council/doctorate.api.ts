const getAllCouncilType = async (lang: string) => {
  try {
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/symposium/type?language=${lang}`,
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getAllCouncilBySLug = async (lang: string, slug: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/symposium/type/${slug}?language=${lang}`,
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { getAllCouncilType, getAllCouncilBySLug };
