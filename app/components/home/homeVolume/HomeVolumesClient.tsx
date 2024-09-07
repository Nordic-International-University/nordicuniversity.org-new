"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

const HomeVolumesClient = ({ volume }: any) => {
  return (
      <section className="mt-8">
          <div className="swiperContainer">
              <Swiper
                  slidesPerView={1} // Default 1 slide for larger screens
                  breakpoints={{
                      // Breakpoints for small screens (max-width: 640px)
                      640: {
                          slidesPerView: 4, // Show 4 slides for screens wider than 640px
                      },
                  }}
                  autoplay={{
                      delay: 1500, // 3 seconds delay between slides
                      disableOnInteraction: false, // Keeps autoplay after user interaction
                  }}
                  loop={true}
                  speed={500}
              >
                  {volume.map((item: any) => (
                      <SwiperSlide key={item.id}>
                          <Link
                              key={item.id}
                              className="cursor-pointer hover:grayscale transition-all"
                              href={`/publications/volume/${item.id}`}
                          >
                              <Image
                                  src={`https://journal2.nordicun.uz${item.image.file_path}`}
                                  width={1000}
                                  height={300}
                                  alt="volume"
                              />
                          </Link>
                      </SwiperSlide>
                  ))}
              </Swiper>
          </div>
      </section>
  );
};

export default HomeVolumesClient;
