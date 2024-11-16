import { ItemImage } from "@/types/students/students.types";
import Image from "next/image";

const Procedures = ({ data }: { data: Array<ItemImage> }) => {
  return (
    <article>
      <div className="w-96">
        <Image
          className="h-[260px] object-cover w-full"
          width={300}
          height={200}
          src={process.env.NEXT_PUBLIC_URL_BACKEND + data[1].photo.file_path}
          alt={data[1].photo.file_name}
        />
        <div className="w-full overflow-auto flex items-center gap-4 scroll-container">
          {data.slice(0, data.length - 1).map((item: ItemImage, index) => (
            <Image
              key={index}
              width={50}
              height={50}
              src={process.env.NEXT_PUBLIC_URL_BACKEND + item.photo.file_path}
              alt={item.photo.file_name}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default Procedures;
