"use client";

import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Image } from "antd";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PhotoGallery = ({
  gallery,
  sectionTitle,
}: {
  gallery: any[];
  sectionTitle: string;
}) => {
  const t = useTranslations("other");
  const [currentPhotos, setCurrentPhotos] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPhotos(gallery.slice(0, 7));
  }, [gallery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextIndex = (startIndex + 7) % gallery.length;
      setCurrentPhotos(gallery.slice(nextIndex, nextIndex + 7));
      setStartIndex(nextIndex);
    }, 7000);

    return () => clearTimeout(timeout);
  }, [startIndex, gallery]);

  useEffect(() => {
    if (containerRef.current) {
      const images = containerRef.current.querySelectorAll(".photo");
      gsap.fromTo(
        images,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.3,
          stagger: 0.2,
          ease: "power2.out",
        },
      );
    }
  }, [currentPhotos]);

  return (
    <section className="bg-anyColor mt-14 pb-14">
      <article className="container mx-auto">
        <div className="w-full justify-end flex">
          <div className="w-3/5 max-sm:w-full max-sm:justify-center flex items-center gap-4 justify-between pt-12 pb-7">
            <h2 className="text-center max-sm:text-lg max-sm:text-left text-white font-semibold text-2xl">
              {sectionTitle}
            </h2>
            <Link
              href={"/students/albums"}
              className="max-sm:hidden block text-blue-200 cursor-pointer font-semibold group-hover:text-blue-400 transition-colors duration-300"
            >
              {t("all")}
            </Link>
          </div>
        </div>

        <Image.PreviewGroup>
          <Row gutter={[16, 16]} className="photo-gallery" ref={containerRef}>
            {currentPhotos.map((photo, index) => (
              <Col
                key={index}
                xs={index === 0 ? 24 : 12}
                sm={index === 0 ? 12 : 6}
                span={index === 0 ? 12 : 6}
              >
                <Image
                  className="photo border-4 rounded"
                  src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${photo.photo.file_path}`}
                  alt={photo.photo.file_name}
                  width="100%"
                  height={index === 0 ? 300 : 300}
                  style={{ objectFit: "cover" }}
                />
              </Col>
            ))}
          </Row>
        </Image.PreviewGroup>
      </article>
    </section>
  );
};

export default PhotoGallery;
