import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const fetchNetworks = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/social-network?page=1&limit=10`,
      { cache: "no-cache" },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch social networks:", error);
    return { data: [] };
  }
};

const SocialMedia = ({ color = "white" }: { color: string }) => {
  const [networks, setNetworks] = useState<any[]>([]);

  useEffect(() => {
    const loadNetworks = async () => {
      const result = await fetchNetworks();
      setNetworks(result.data || []);
    };

    loadNetworks();
  }, []);

  // const getColorFilter = (color: string) => {
  //   switch (color) {
  //     case "white":
  //       return "invert(1)";
  //     case "black":
  //       return "invert(0)";
  //     case "red":
  //       return "invert(25%) sepia(95%) saturate(7400%) hue-rotate(360deg)";
  //     case "blue":
  //       return "invert(25%) sepia(95%) saturate(7400%) hue-rotate(220deg)";
  //     default:
  //       return "invert(1)";
  //   }
  // };

  return (
    <div>
      <div className="flex max-lg:w-full flex-row-reverse items-center justify-between gap-6">
        <div className="flex text-white items-center gap-3 max-sm:gap-1.5">
          {networks.map((item, index) => (
            <React.Fragment key={item.id || index}>
              <Link target="_blank" href={item.link}>
                <Image
                  className="min-h-5 min-w-5"
                  // style={{
                  //   filter: getColorFilter(color),
                  // }}
                  width={18}
                  height={18}
                  src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.icon.file_path}`}
                  alt={item.name || "Icon"}
                />
              </Link>
              {index < networks.length - 1 && (
                <span className={`block bg-${color} h-[20px] w-[0.5px]`}></span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
