import React from "react";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import Link from "next/link";
import { UrlObject } from "url";
import SearchInput from "@/app/components/main/searchInput";

interface PageProps {
  params: {
    slug: string;
  };
}

const SearchResults = async (slug: string, lang: string) => {
  const result = await fetch(
    `http://localhost:3000/api/search?query=${slug}&lang=${lang}`,
  );
  return await result.json();
};

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const data = await SearchResults(slug, await getCurrentLangServer());
  console.log(data);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <SearchInput />
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Qidiruv natijalari:
        </h2>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map(
              (
                item: { route: string | UrlObject; includedText: any[] },
                index: React.Key | null | undefined,
              ) => (
                <Link href={item.route} key={index} legacyBehavior>
                  <a className="block p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-gray-300">
                    {item.includedText.map(
                      (textItem: any, textIndex: number) => (
                        <p
                          key={textIndex}
                          className="text-gray-700 line-clamp-1 text-sm"
                          dangerouslySetInnerHTML={{ __html: textItem.text }}
                        ></p>
                      ),
                    )}
                  </a>
                </Link>
              ),
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-4">
            Natijalar topilmadi
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
