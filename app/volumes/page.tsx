import React from 'react';
import Image from "next/image";
 async function getVolume() {

    const res = await fetch('https://journal2.nordicun.uz/volume');
    const data = await res.json();

 return data
}
const Page = async () => {
  const data=await getVolume();

    return (
        <div>
            {data.map((item: any, index: number) => (
                <div>
                    {item.title}
                    <Image
                        src={`${"https://journal2.nordicun.uz"}${item?.image?.file_path}`}
                        alt="img"
                        width={270}
                        height={270}
                        className="rounded-full"
                    />
                </div>
            ))}
        </div>
    );
};

export default Page;