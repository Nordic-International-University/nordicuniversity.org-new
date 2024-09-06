"use client"

import React from 'react';
import CreateArticle from "@/app/components/profile/createArticle";
import {useParams} from "next/navigation";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";

const Page = () => {
    const params:Params = useParams();

    return (
        <div className="container">
            <CreateArticle authorId={params.authorId}/>
        </div>
    );
};

export default Page;