import { useEffect, useRef } from "react";
import { ForumPhoto } from "@/types/templates/nordiklieve.types";
import Image from "next/image";
import { Button } from "antd";
import gsap from "gsap";
import { useTranslations } from "next-intl";

const Partners = ({ props }: { props: ForumPhoto[] }) => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const t = useTranslations("buttons");

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "expo.out",
      },
    );
  }, [props.length]);

  return (
    <article className="mt-10 mb-10">
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 place-items-center">
        {props.map((item, index) => (
          <div
            ref={(el: any) => (cardsRef.current[index] = el!)}
            className="w-full p-4 bg-white h-[480px] flex flex-col justify-between border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            key={index}
          >
            <Image
              className="rounded-lg w-full h-[300px] object-cover"
              width={300}
              height={300}
              src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.hero_image.file_path}`}
              alt={item.name}
            />
            <div>
              <h2 className="mt-4 text-lg font-semibold text-center text-gray-800 line-clamp-2">
                {item.name}
              </h2>
              <div className="flex justify-center mt-6">
                <Button
                  href={`/partners/international-meetings-photos/${item.slug}`}
                  className="px-6 w-full py-2 text-white bg-text_secondary hover:bg-tertiary rounded-lg transition duration-300"
                  type="primary"
                >
                  {t("details")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Partners;
