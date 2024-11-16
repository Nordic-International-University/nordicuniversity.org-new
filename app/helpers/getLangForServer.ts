// app/helpers/getCurrentLangServer.ts
import { cookies } from "next/headers";

async function fetchDefaultLanguage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/language`,
    );
    const data = await res.json();
    return data.language || "uz";
  } catch (error) {
    console.error("Failed to fetch default language:", error);
    return "uz";
  }
}

export const getCurrentLangServer = async () => {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;

  if (lang) {
    return lang;
  } else {
    // If no language is set in cookies, fetch the default language
    return await fetchDefaultLanguage();
  }
};
