"use client";

import React, { useEffect, useRef } from "react";
import { Row, Col, Image } from "antd";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PhotoGallery = ({ gallery }: { gallery: any[] }) => {
  const photoRefs = useRef<HTMLDivElement[]>([]);

  // Birinchi 7 ta elementni olish va "size" qo'shish
  const photos = gallery.slice(0, 7).map((photo, index) => ({
    ...photo,
    size: index === 0 ? "large" : "small", // 1-rasm katta, qolganlari kichik
  }));

  useEffect(() => {
    photoRefs.current.forEach((photo) => {
      gsap.fromTo(
        photo,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: photo,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          stagger: 0.2,
        },
      );
    });
  }, []);

  return (
    <section className="bg-anyColor mt-14 pb-14">
      <article className="container">
        <h2 className="text-center text-white font-semibold text-2xl pt-12 pb-7">
          Foto Jamlanma
        </h2>
        <Image.PreviewGroup>
          <Row gutter={[16, 16]}>
            {photos.map((photo, index) => (
              <Col
                key={index}
                xs={photo.size === "large" ? 24 : 12}
                sm={photo.size === "large" ? 12 : 6}
                span={photo.size === "large" ? 12 : 6}
                ref={(el: HTMLDivElement | any) =>
                  (photoRefs.current[index] = el)
                }
              >
                <Image
                  className="border-4"
                  src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${photo.photo.file_path}`}
                  alt={photo.photo.file_name}
                  width="100%"
                  height={photo.size === "large" ? 300 : 300}
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
