const getAllDoctorate = async (lang: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/doctorate/field?language=${lang}`,
    );
    return response.json();
  } catch (err) {
    return [];
  }
};

const getAllDoctorateCount = async (lang: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/doctorate/count`,
    );
    return response.json();
  } catch (err) {
    return { doctorate_dsc: 0, doctorate_phd: 0, researcher_dsc: 0, researcher_phd: 0 };
  }
};

export { getAllDoctorate, getAllDoctorateCount };
