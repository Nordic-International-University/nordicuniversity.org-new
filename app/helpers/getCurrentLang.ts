import Cookies from "js-cookie";

const getCurrentLangClient = () => {
  if (typeof window === "undefined") {
    return "uz"; // SSR bo'lsa, default til qaytariladi
  }

  const lang = Cookies.get("lang");
  return lang || "uz";
};

export default getCurrentLangClient;
