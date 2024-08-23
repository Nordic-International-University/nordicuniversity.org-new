import React from 'react';
import VolumeClient from "@/app/volumes/[data]/VolumeClient";

async function getVolume() {
    const res = await fetch("https://journal2.nordicun.uz/category");
    const data = await res.json();

    return data;
}

const Page = async () => {
    const data = await getVolume();
    return (
        <div>
            <VolumeClient data={data}/>
        </div>
    );
};

export default Page;