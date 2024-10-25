import Cookies from "js-cookie";

const getCurrentLang = () => {
  const lang = Cookies.get("lang");
  return lang ? lang : "uz";
};

export default getCurrentLang;
