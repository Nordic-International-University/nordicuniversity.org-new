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
      return { data: [] };
    }
    return await response.json();
  } catch {
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

  return (
    <div className="flex items-center gap-2.5">
      {networks.map((item, index) => (
        <Link
          key={item.id || index}
          target="_blank"
          href={item.link}
          className="opacity-80 hover:opacity-100 transition-opacity"
        >
          <Image
            className="min-h-[18px] min-w-[18px]"
            width={18}
            height={18}
            src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.icon.file_path}`}
            alt={item.name || "Social"}
          />
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
