"use client";

import React, { useEffect, useRef } from "react";
import { Row, Col, Image } from "antd";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { src: "https://picsum.photos/600/400", alt: "Photo 1", size: "large" },
  { src: "https://picsum.photos/300/200", alt: "Photo 2", size: "small" },
  { src: "https://picsum.photos/300/500", alt: "Photo 3", size: "small" },
  { src: "https://picsum.photos/300/600", alt: "Photo 4", size: "small" },
  { src: "https://picsum.photos/300/780", alt: "Photo 5", size: "small" },
  { src: "https://picsum.photos/300/670", alt: "Photo 6", size: "small" },
  { src: "https://picsum.photos/300/280", alt: "Photo 7", size: "small" },
];

const PhotoGallery = ({ gallery }: any) => {
  const photoRefs = useRef([]);

  console.log(gallery);
  useEffect(() => {
    photoRefs.current.forEach((photo) => {
      gsap.fromTo(
        photo,
        {
          opacity: 0,
          y: 100, // Start 1200px down
        },
        {
          opacity: 1,
          y: 0, // Animate to 0
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: photo,
            start: "top 90%", // Trigger animation when photo is 90% in viewddd
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
                ref={(el: any) => ((photoRefs as any).current[index] = el)} // Store reference to each Col element
              >
                <Image
                  className="border-4"
                  src={photo.src}
                  alt={photo.alt}
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
