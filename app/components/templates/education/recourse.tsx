import Image from "next/image";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

const Recourse = ({ props }: any) => {
  return (
    <article className="mt-8">
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {props.map((item: any, index: number) => (
          <Link
            href={item.link}
            target="_blank"
            key={index}
            className="group border border-gray-200 rounded-xl p-5 bg-white
              hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineExternalLink className="text-text_secondary text-lg flex-shrink-0" />
              <h2 className="text-text_secondary font-semibold text-base leading-snug line-clamp-1 group-hover:text-text_secondary/80 transition-colors">
                {item.name}
              </h2>
            </div>
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default Recourse;
