import React, { useEffect, useState } from "react";
import {
  ISymposiumForUser,
  ISymposiumTypeForUser,
} from "@/types/research/scince_events";
import { Button } from "antd";
import { Calendar1Icon, CalendarX } from "lucide-react";

interface ScientificCouncilProps {
  data: ISymposiumForUser[];
  buttons: ISymposiumTypeForUser[];
  setSlug: (slug: string) => void;
  slug: string;
}

const ScientificCouncil = ({
  data,
  buttons,
  setSlug,
  slug,
}: ScientificCouncilProps) => {
  const [activeButton, setActiveButton] = useState<string>();

  const handleButtonClick = (slug: string) => {
    setActiveButton(slug);
    setSlug(slug);
  };

  useEffect(() => {
    setActiveButton(slug);
  });

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`px-6 py-3 rounded-lg border border-primary border-[2px] font-semibold transition ${
              activeButton === button.slug
                ? "bg-primary-gradient text-white border-blue-700"
                : "bg-white text-primary hover:bg-primary-gradient hover:text-white"
            }`}
            onClick={() => handleButtonClick(button.slug)}
          >
            {button.name}
          </button>
        ))}
      </div>

      {/* Symposium Cards */}
      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-full bg-white shadow-md rounded-lg border hover:shadow-lg transition"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar1Icon /> {item.year}
                </div>
                {item.file && (
                  <Button
                    className="bg-secondary max-sm:px-6 max-sm:py-4 text-white text-lg px-10 py-5"
                    target="_blank"
                    href={item.file.file_path}
                  >
                    PDF
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScientificCouncil;
