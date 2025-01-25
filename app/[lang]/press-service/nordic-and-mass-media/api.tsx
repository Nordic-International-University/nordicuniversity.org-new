export const getAllMassMedia = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/press/nordic-mass-media?language=${lang}`,
    {
      cache: "no-cache",
    },
  );
  return await response.json();
};
