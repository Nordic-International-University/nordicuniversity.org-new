import customBorder from "@/public/images/education-image/border.png";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Recourse = ({ props }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      (containerRef as any).current?.children,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotation: -10,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        stagger: 0.2,
        duration: 1,
        ease: "elastic.out(1, 0.75)",
      },
    );
  }, []);

  const handleHover = (el: HTMLDivElement) => {
    gsap.to(el, {
      scale: 1.05,
      rotate: 2,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (el: HTMLDivElement) => {
    gsap.to(el, {
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
  };

  return (
    <article className="mt-10">
      <div
        className="grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 grid gap-10"
        ref={containerRef}
      >
        {props.map((item: any, index: number) => (
          <Link href={item.link} target="_blank" key={index}>
            <div
              className="group relative p-4 rounded-lg transition-all"
              onMouseEnter={(e) => handleHover(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <h2 className="text-tertiary font-semibold group-hover:text-primary transition-colors duration-300">
                {item.name}
              </h2>
              <div className="relative">
                <Image
                  className="absolute -top-1 -right-1"
                  src={customBorder}
                  alt="custom border"
                />
                <p className="mt-3 text-brodCrumbColor line-clamp-2 custom-border">
                  {item.description}
                </p>
                <Image
                  className="absolute rotate-180 -left-2 -bottom-2"
                  src={customBorder}
                  alt="custom border"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default Recourse;
