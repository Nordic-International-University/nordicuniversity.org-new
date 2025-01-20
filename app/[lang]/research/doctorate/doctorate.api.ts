const getAllDoctorate = async (lang: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/doctorate/field?language=${lang}`,
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getAllDoctorateCount = async (lang: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/doctorate/count`,
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { getAllDoctorate, getAllDoctorateCount };
