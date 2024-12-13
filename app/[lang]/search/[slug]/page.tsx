"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tag, Input, Select, Button } from "antd";
import { EnumTypeSearch } from "@/app/components/UI/searchTypeComponent";
import { useTranslations } from "next-intl";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import { useParams } from "next/navigation";

const { Option } = Select;

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

  return tagColors[lang]?.[type] || "default";
};

const Page = () => {
  const { slug: text } = useParams<{ slug: string }>();
  const [slug, setSlug] = useState(text);
  const [lang, setLang] = useState(getCurrentLangClient());
  const [data, setData] = useState<RouteData[]>([]);
  const [backendData, setBackendData] = useState<any[]>([]);
  const [queryType, setType] = useState<string | undefined>(EnumTypeSearch.All);
  const t = useTranslations("searchType");

  const fetchSearchResults = async () => {
    if (!slug) return;

    try {
      const result = await fetch(`/api/search?query=${slug}&lang=${lang}`, {
        cache: "no-store",
      });
      const responseData = await result.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const fetchUniversalResults = async () => {
    if (!slug) return;

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/search?query=${slug}&language=${lang}&type=${queryType || "all"}&page=1&limit=1000`,
        { cache: "no-store" },
      );

      if (result.ok) {
        const responseData = await result.json();
        setBackendData(responseData);
      } else {
        console.error("API error:", result.status, await result.text());
      }
    } catch (error) {
      console.error("Error fetching universal results:", error);
    }
  };

  console.log(backendData);
  useEffect(() => {
    fetchSearchResults();
    fetchUniversalResults();
  }, [slug, lang, queryType]);

  return (
    <div className="bg-gray-200">
      <div className="bg-gray-100 py-10 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold text-gray-800">Search</h1>
          <div className="mt-4 mx-auto max-w-xl">
            <Input
              placeholder="Enter your search query"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              allowClear
            />
          </div>
          <div className="mt-5 flex items-center justify-center flex-wrap gap-3">
            {Object.values(EnumTypeSearch).map((type) => (
              <Button
                onClick={() => setType(type)}
                type={queryType === type ? "primary" : "default"}
              >
                {t(`${type}`)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white py-10">
        <div className="container px-6">
          {/*{data.length > 0 ? (*/}
          {/*  <div className="space-y-6">*/}
          {/*    {data.map((item, index) => (*/}
          {/*      <Link href={item.route} key={index}>*/}
          {/*        <div className="relative px-6 pb-4 max-md:pt-5 pt-14 block bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-gray-300">*/}
          {/*          <Tag*/}
          {/*            color="cyan"*/}
          {/*            className="font-semibold max-md:w-full max-md:static right-0 top-2.5 absolute text-lg mb-2"*/}
          {/*          >*/}
          {/*            {item.sectionTitle || "Nordic University"}*/}
          {/*          </Tag>*/}
          {/*          <p*/}
          {/*            className="text-gray-600 text-sm line-clamp-2"*/}
          {/*            dangerouslySetInnerHTML={{*/}
          {/*              __html: item.includedText[0]?.text || "",*/}
          {/*            }}*/}
          {/*          ></p>*/}
          {/*        </div>*/}
          {/*      </Link>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <p className="text-center text-gray-600 text-lg">*/}
          {/*    No results found*/}
          {/*  </p>*/}
          {/*)}*/}

          {backendData.length > 0 ? (
            <div className="flex flex-col gap-5 mt-5">
              {backendData.map(
                (category, index) =>
                  category.data.length > 0 && (
                    <div key={index}>
                      <div className="flex flex-col gap-5">
                        {category.data.map((item: any, index: number) => (
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
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item.snippet,
                                }}
                                className="text-gray-600 text-sm line-clamp-2"
                              ></p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>
          ) : (
            <div className="mt-5 text-center">
              <div className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">
                  Ma'lumot topilmadi
                </h3>
                <p className="text-gray-600">
                  Sizning qidiruvingiz bo‘yicha hech qanday natija topilmadi.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
