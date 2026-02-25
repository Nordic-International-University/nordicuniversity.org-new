// app/helpers/getCurrentLangServer.ts
import { getLocale } from "next-intl/server";

export const getCurrentLangServer = async () => {
  return await getLocale();
};
