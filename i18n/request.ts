import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "../i18n.config";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) {
    return notFound();
  }

  // Load the messages for the specific locale
  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
