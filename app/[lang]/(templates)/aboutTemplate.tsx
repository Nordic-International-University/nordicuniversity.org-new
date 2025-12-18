"use client";

import React from "react";
import dynamic from "next/dynamic";

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Import ReactQuill styles
import "react-quill/dist/quill.bubble.css";

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
    console.log('AboutTemplate received data:', data);

    if (!data || !data.data || !data.data.content) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">{data?.subPage_title || "Sahifa"}</h1>
                <p className="text-gray-500">Ma'lumot hali yuklanmagan.</p>
            </div>
        )
    }

    return (
        <article className="container mx-auto px-4 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6 text-primary">{data.subPage_title}</h1>
            <div className="prose max-w-none text-gray-800">
                <ReactQuill
                    value={data.data.content}
                    readOnly={true}
                    theme="bubble"
                    modules={{ toolbar: false }}
                />
            </div>
        </article>
    );
};

export default AboutTemplate;
