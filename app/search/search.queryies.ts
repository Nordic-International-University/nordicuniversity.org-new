import axios from 'axios'


const volumeToValueAndLabel = (data: any, valueName: any, labelName: any) => {
  if (!Array.isArray(data)) {
    console.error("Expected data to be an array but received:", data);
    return []; // Return an empty array or handle it as needed
  }

  return data.map((item: any) => ({
    value: item[valueName],
    label: item[labelName],
  }));
};

const getAuthor = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL2}/author`);
  return response?.data?.data;
};

const getSubCategoriesByCategoryId = async (id_list:any) => {
  const url =
    id_list?.length > 0
      ? `${process.env.REACT_APP_API_URL2}/subcategory/sub`
      : `${process.env.REACT_APP_API_URL2}/subcategory`;
  const reqOption = {
    url,
    method: id_list?.length > 0 ? "POST" : "GET",
    data: {
      id_list,
    },
  };
  const response = await axios.request(reqOption);
  return response.data;
};

const getAllFilteredArticles = async ({ data, page, limit }:any) => {
  console.log(data)
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL2}/article/multi-search?page=${page}&limit=${limit}`,
    data,
  );
  return response.data;
};

export {
  volumeToValueAndLabel,
  getAuthor,
  getSubCategoriesByCategoryId,
  getAllFilteredArticles,
};
