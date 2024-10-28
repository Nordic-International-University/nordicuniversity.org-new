import React from "react";
import rasm from "@/public/images/education-images/pexels-iriser-1379636.jpg";
import Image from "next/image";

const EducationDegree = () => {
  return (
    <article className="mt-6 flex i  ">
      <div>
        <h1 className="text-[17px] font-medium leading-[20.72px] text-[#364E6B]">
          Fakulterlar, Kafedralar va Departamentlar{" "}
        </h1>
        <p className="text-[14px] font-normal leading-[18px] tracking-[0.02em] text-[#7A98C1CC] w-1/2 mt-3">
          Xalqaro Nordik Universitetida Bakalavr (kunduzgi, sirtqi va maxsus
          sirtqi), Magistratura fakulteti, Doktorantura, 6 ta kafedra va 8 ta
          department mavjud.
        </p>
        <ul className="list-disc text-sm font-medium leading-[23px] tracking-[0.03em] text-[#46658B] mt-6 ml-4 w-1/2">
          <li>
            Bakalavr bosqichi{" "}
            <span className="text-sm font-bold leading-[23px] tracking-[0.03em]">
              12ta
            </span>{" "}
            yo’nalish.
          </li>
          <li>
            Masgistratura bosqichi{" "}
            <span className="text-sm font-bold leading-[23px] tracking-[0.03em]">
              6 ta
            </span>{" "}
            yo’nalish.
          </li>
          <li>
            Doktorantura bosqichi{" "}
            <span className="text-sm font-bold leading-[23px] tracking-[0.03em]">
              3ta
            </span>{" "}
            yo’nalish.
          </li>
        </ul>
        <h2 className="text-[14px] w-1/2 font-normal leading-[18px] tracking-[0.02em] text-[#7A98C1CC] mt-3">
          Barcha ta'lim yo'nalishlarimiz bugungi kunda barcha sohalarda yuqori
          talabga ega.
        </h2>
      </div>
      <div>
        <Image
          src={rasm}
          alt="rasm"
          width={600}
          height={600}
          className="rounded"
        />
      </div>
    </article>
  );
};

export default EducationDegree;
