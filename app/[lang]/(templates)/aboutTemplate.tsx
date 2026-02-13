"use client";

import React from "react";

interface AboutTemplateProps {
  data: {
    template_type: string;
    subPage_title: string;
    subPage_title_uz?: string;
    subPage_title_ru?: string;
    subPage_title_en?: string;
    data: {
      id: string;
      subPage_id: string;
      content: string | null;
      content_uz?: string | null;
      content_ru?: string | null;
      content_en?: string | null;
    };
  };
}

const AboutTemplate: React.FC<AboutTemplateProps> = ({ data }) => {
  if (!data || !data.data || !data.data.content) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl text-gray-400">!</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          {data?.subPage_title || "Sahifa"}
        </h1>
        <p className="text-gray-500 text-sm">Ma&apos;lumot hali yuklanmagan.</p>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 lg:px-8 py-10">
      <div
        dangerouslySetInnerHTML={{ __html: data.data.content }}
        className="prose max-w-none text-gray-700 leading-7"
      />
    </article>
  );
};

export default AboutTemplate;