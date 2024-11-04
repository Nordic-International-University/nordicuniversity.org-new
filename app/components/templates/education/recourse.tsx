import customBorder from "@/public/images/education-image/border.png";
import Image from "next/image";
import Link from "next/link";

const Recourse = ({ props }: any) => {
  return (
    <article className="mt-10">
      <div className="grid-cols-3 max-lg:grid-cols-2  max-sm:grid-cols-1 grid gap-10">
        {props.map((item: any, index: number) => (
          <Link href={item.link} key={index}>
            <h2 className="text-tertiary font-semibold">{item.name}</h2>
            <div className="relative">
              <Image
                className="absolute -top-1 -right-1"
                src={customBorder}
                alt="custom border"
              />
              <p className="mt-3 text-brodCrumbColor custom-border">
                {item.description}
              </p>
              <Image
                className="absolute rotate-180 -left-2 -bottom-2"
                src={customBorder}
                alt="custom border"
              />
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default Recourse;
