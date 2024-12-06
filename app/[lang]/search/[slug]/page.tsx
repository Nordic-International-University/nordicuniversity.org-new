import React from "react";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import Link from "next/link";
import SearchInput from "@/app/components/main/searchInput";
import { getTranslations } from "next-intl/server";
import { Tag } from "antd";

interface PageProps {
  params: {
    slug: string;
  };
}

interface IncludedText {
  path: string;
  text: string;
}

interface RouteData {
  route: string;
  includedText: IncludedText[];
  sectionTitle: string;
}

const getTagColor = (type: string, lang: string): string => {
  if (!lang || !type) {
    console.warn("lang yoki type undefined bo'lishi mumkin.");
    return "default";
  }

  const tagColors: { [key: string]: { [key: string]: string } } = {
    ru: {
      "Часто задаваемые вопросы": "green",
      Новости: "blue",
      Наука: "purple",
      Подкасты: "red",
      "Образовательные направления": "orange",
      "Международное сотрудничество": "cyan",
      "Образовательные ресурсы": "gold",
      "Пресс-релизы": "magenta",
      "Журнал Nordic life": "lime",
      "Организационная структура": "geekblue",
      Сотрудники: "volcano",
    },
    en: {
      "Frequently Asked Questions": "green",
      News: "blue",
      Science: "purple",
      Podcasts: "red",
      "Educational Directions": "orange",
      "Cooperation Relations": "cyan",
      "Educational Resources": "gold",
      "Press Releases": "magenta",
      "Nordic Life Journal": "lime",
      "Organizational Structure": "geekblue",
      Staff: "volcano",
    },
    uz: {
      "Ko‘p beriladigan savollar": "green",
      Yangiliklar: "blue",
      "Ilm-fan": "purple",
      Podkastlar: "red",
      "Press-relizlar": "magenta",
      "Ta'lim yo'nalishlari": "orange",
      "Hamkorlik aloqalari": "cyan",
      "Ta'lim resurslari": "gold",
      "Matbuot xabarlari": "magenta",
      "Nordic life jurnali": "lime",
      "Tashkiliy tuzilma": "geekblue",
      Xodimlar: "volcano",
    },
  };

  return tagColors[lang] ? tagColors[lang][type] || "default" : "default";
};

const SearchResults = async (slug: string, lang: string) => {
  const result = await fetch(
    `http://localhost:3778/api/search?query=${slug}&lang=${lang}`,
    { cache: "no-store" },
  );
  //ss
  return await result.json();
};

const SearchUniversalResults = async (slug: string, lang: string) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/search?query=${slug}&language=${lang}&page=1&limit=1000`,
    { cache: "no-store" },
  );

  if (!result.ok) {
    console.error("API error:", result.status, await result.text());
    return [];
  }

  try {
    return await result.json();
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
};

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const lang = await getCurrentLangServer();
  const data: RouteData[] = await SearchResults(slug, lang);
  const backendData = await SearchUniversalResults(slug, lang);

  const translations = await getTranslations("search");

  return (
    <div className="bg-gray-200">
      <div className="bg-gray-100  py-10 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold text-gray-800">
            {translations("searchText")}
          </h1>
          <div className="mt-4 mx-auto max-w-xl">
            <SearchInput />
          </div>
        </div>
      </div>
      <div className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          {data.length > 0 ? (
            <div className="space-y-6">
              {data.map((item, index: React.Key | number) => (
                <Link href={item.route} key={index} legacyBehavior>
                  <div className="relative px-6 pb-4 max-md:pt-5 pt-14 block bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-gray-300">
                    <Tag
                      color="cyan"
                      className="font-semibold max-md:w-full max-md:static right-0 top-2.5 absolute text-lg mb-2"
                    >
                      {item.sectionTitle || "Nordic University"}
                    </Tag>
                    <p
                      className="text-gray-600 text-sm line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.includedText[0]?.text || "",
                      }}
                    ></p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">
              {translations("data")}
            </p>
          )}

          {backendData.length > 0 && (
            <div className="flex flex-col gap-5 mt-5">
              {backendData.map(
                (category: any, index: React.Key | number) =>
                  category.data.length > 0 && (
                    <div key={index}>
                      <div className="flex flex-col gap-5">
                        {category.data.map(
                          (item: any, index: React.Key | number) => (
                            <Link href={item.route} key={index}>
                              <div className="block max-md:pt-10 relative p-6 bg-gray-50 max-md:pt-3 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-gray-300">
                                <Tag
                                  color={getTagColor(category.type, lang)}
                                  className="font-semibold max-md:w-full right-0 top-2.5 max-md:static absolute text-lg mb-2"
                                >
                                  {category.type || "Nordic University"}
                                </Tag>
                                <h3 className="font-semibold max-w-[970px] text-gray-800 text-lg mb-2">
                                  {item.name || "No Title"}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                  {item.description ||
                                    "No description available."}
                                </p>
                              </div>
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
