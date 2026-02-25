import { getRequestConfig } from "next-intl/server";
import { locales, type Locale } from "./i18n.config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as Locale) ? requested! : "uz";

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
