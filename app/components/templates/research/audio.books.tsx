import React from "react";
import Image from "next/image";
import {
  ApiResponse,
  AudioBooksTypeItem,
} from "@/types/research/scince_events";
import Link from "next/link";

const AudioBooks = ({ data }: { data: ApiResponse<AudioBooksTypeItem[]> }) => {
  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data?.data?.map((item) => (
          <Link
            href={`/press-service/audio-books/${item.slug}`}
            key={item.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform"
          >
            <div className="relative w-full h-60">
              <Image
                src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl line-clamp-1 font-semibold mb-1">
                {item.name}
              </h2>
              {item.year && (
                <p className="text-sm text-gray-600">Yil: {item.year}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AudioBooks;
