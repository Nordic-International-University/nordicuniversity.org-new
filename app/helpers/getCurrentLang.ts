import Cookies from "js-cookie";

const getCurrentLangClient = () => {
  const lang = Cookies.get("lang");
  return lang ? lang : "uz";
};

export default getCurrentLangClient;
