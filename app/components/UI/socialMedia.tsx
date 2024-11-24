"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const fetchNetworks = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/social-network?page=1&limit=4`,
      { cache: "no-cache" },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Failed to fetch social networks:", error);
    return { data: [] }; // Fallback to an empty array
  }
};

const SocialMedia = () => {
  const [networks, setNetworks] = useState<any[]>([]);

  useEffect(() => {
    const loadNetworks = async () => {
      const result = await fetchNetworks();
      setNetworks(result.data || []);
    };

    loadNetworks();
  }, []);

  return (
    <div>
      <div className="flex max-lg:w-full flex-row-reverse items-center justify-between gap-6">
        <div className="flex text-white items-center gap-3 max-sm:gap-1.5">
          {networks.map((item, index) => (
            <React.Fragment key={item.id || index}>
              <Link href={item.link}>
                <Image
                  className="fill-white min-h-5 min-w-5"
                  style={{
                    filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",
                  }}
                  width={18}
                  height={18}
                  src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.icon.file_path}`}
                  alt={item.name || "Icon"}
                />
              </Link>
              {index < networks.length - 1 && (
                <span className="block bg-white h-[20px] w-[0.5px]"></span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
