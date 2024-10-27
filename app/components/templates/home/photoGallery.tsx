"use client";

import React from "react";
import { Row, Col, Image } from "antd";

const photos = [
  { src: "https://picsum.photos/600/400", alt: "Photo 1", size: "large" },
  { src: "https://picsum.photos/300/200", alt: "Photo 2", size: "small" },
  { src: "https://picsum.photos/300/500", alt: "Photo 3", size: "small" },
  { src: "https://picsum.photos/300/600", alt: "Photo 4", size: "small" },
  { src: "https://picsum.photos/300/780", alt: "Photo 5", size: "small" },
  { src: "https://picsum.photos/300/670", alt: "Photo 6", size: "small" },
  { src: "https://picsum.photos/300/280", alt: "Photo 6", size: "small" },
];

const PhotoGallery = () => {
  return (
    <section className="bg-diamond-gradient mt-14 pb-14">
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
