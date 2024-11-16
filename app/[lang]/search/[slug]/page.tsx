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
    { cache: "no-store" },
  );
  return await result.json();
};

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const data = await SearchResults(slug, await getCurrentLangServer());
  console.log(data);
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <div className="bg-gray-100 py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Qidiruv</h1>
        <div className="mt-4 mx-auto max-w-xl">
          <SearchInput />
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filters */}

          {/* Search Results */}
          {data.length > 0 ? (
            <div className="space-y-6">
              {data.map(
                (
                  item: { route: string | UrlObject; includedText: any[] },
                  index: React.Key | null | undefined,
                ) => (
                  <Link href={item.route} key={index} legacyBehavior>
                    <a className="block p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-gray-300">
                      <h3 className="font-semibold text-gray-800 text-lg mb-2">
                        {item.sectionTitle || "Nordic University"}
                      </h3>
                      <p
                        className="text-gray-600 text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: item.includedText[0]?.text || "",
                        }}
                      ></p>
                    </a>
                  </Link>
                ),
              )}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">
              Malumotlar Topilmadi
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
