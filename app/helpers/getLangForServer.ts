// app/helpers/getCurrentLangServer.ts
import { cookies } from "next/headers";

export const getCurrentLangServer = () => {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;
  return lang ? lang : "uz";
};
