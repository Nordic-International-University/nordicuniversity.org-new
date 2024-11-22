import React from "react";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { CooperationPhotoGallery } from "@/types/templates/international-meeating";
import { Image } from "antd";
import { getTranslations } from "next-intl/server";
import BroadCamp from "@/app/components/UI/broadCump";

type props = React.FC<{ params: { slug: string } }>;

const getAllAlbumsBySlug = async (slug: string, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/cooperation/photo-types/${slug}?language=${lang}`,
  );
  const json = await response.json();
  return json;
};

const Page: props = async ({ params }) => {
  const data: CooperationPhotoGallery = await getAllAlbumsBySlug(
    params.slug,
    await getCurrentLangServer(),
  );
  const t = await getTranslations("partners");

  const brodCmbItems = [
    {
      url: "/press-service/news",
      name: t("title"),
    },
    {
      url: <p>{`/press-service/news/${params.slug}`}</p>,
      name: data.name,
    },
  ];

  return (
    <section className="mt-6">
      <article className="container">
        <h2 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-semibold pb-3">
          {t("formAlbums.album")}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
        <div className="flex flex-wrap  mt-4 justify-between gap-y-4">
          {data.CooperationPhotosModel.map((item, index) => (
            <Image
              className="object-cover mx-auto block"
              alt={item.photo.file_name}
              width={200}
              height={200}
              key={index}
              src={process.env.NEXT_PUBLIC_URL_BACKEND + item.photo.file_path}
            />
          ))}
        </div>
      </article>
    </section>
  );
};

export default Page;
