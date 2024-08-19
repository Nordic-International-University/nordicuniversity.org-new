import React from "react";
import Image from "next/image";
import abstract from "@/public/abstrakt.d8a2d89523158d92ef74.jpg";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
export default function Page() {
  return (
    <div className="container">
      <div> <RoundedSvg title="lmiy maqolaga qo‘yilgan talablar" /></div>

      <div className="flex  items-center justify-center w-full gap-4 pt-24 pb-24">
        <div className="flex w-2/3 shadow-[0.6em_0.6em_1.2em_#d2dce9,-0.5em_-0.5em_1em_#fff] px-3 py-3 rounded-[30px]">
          <div className=" px-3 py-3">
            <h1 className="text-[#36187d] font-bold text-[15px]">
              <strong>
                1. ABSTRAKT (ANNOTATSIYA)
              </strong>

            </h1>
            <ul>
              <li>- Muammoning qo‘yilishi;</li>
              <li>- Metodologiyani aniqlash;</li>
              <li>- Asosiy topilmalar;</li>
              <li>- Umumiy xulosa.</li>
            </ul>
            <h1 className="text-[#36187d] font-bold text-[15px]">2. KIRISH</h1>
            <ul>
              <li>
                - Tadqiqot ob'yektini belgilab olish (markaziy tushunchalarni
                mujassamlashtirish, mavzuni umumlashtirish, oldingi tadqiqot
                ob'yektlarini ko‘rib chiqish);
              </li>
              <li>
                - Tadqiqotning borish jarayoni (maqsadlarni tavsiflash, ayni
                vaqtdagi tadqiqot ishlarini e’lon qilish, asosiy ilmiy yangilik
                va topilmalarni hamda jarayonni tavsiflovchi natijalarni
                ta’kidlash.
              </li>
              <li>- ADABIYOTLAR SHARXI</li>
            </ul>
            <h1 className="text-[#36187d] font-bold text-[15px]">
              3. METODOLOGIYA
            </h1>
            <ul>
              <li>
                - Ishonchli ma’lumotlarni yig‘ish jarayoni va ma’lumotlarni
                tahlil qilish metodikasi.
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-[#36187d] font-bold text-[15px]">
              4. TADQIQOT NATIJASI
            </h1>
            <ul>
              <li>
                - Olingan natijalarni izohlash va uning ilmiy ahamiyatini ochib
                berish.
              </li>
            </ul>
            <h1 className="text-[#36187d] font-bold text-[15px]">
              5. DISKUSSIYA
            </h1>
            <ul>
              <li>
                - Kirish (ilmiy topilmalarni muhokama qilish va ularning
                ishonchliligini isbotlash ).
              </li>
              <li>
                - Baholash (tahlil qilish, tushunchalarning ma’noviy tasnifi,
                adabiyotlarga havola, qo‘yilgan gipotezalar bo‘yicha xulosalar;
              </li>
              <li>
                - - Xulosa (tadqiqotning cheklanganligi (qamrov doirasi),
                o‘rganilmagan jihatlar bo‘yicha tavsiyalar)
              </li>
            </ul>
            <h1 className="text-[#36187d] font-bold text-[15px]">6. XULOSA</h1>
            <ul>
              <li>
                - Xulosa aniq va qisqa, muammoning yechimiga qaratilgan va aniq
                takliflarga ega bo‘lishi lozim.
              </li>
            </ul>
            <h1 className="text-[#36187d] font-bold text-[15px]">
              7. TASHAKKURNOMA
            </h1>
            <ul>
              <li>
                - Tadqiqot davomida muallifga yordam bergan olimlar,
                hammualliflar, tadqiqot o‘tkazilgan tashkilot va h.k larga
                muallifning tashakkurnomasi.
              </li>
            </ul>
            <h1 className="text-[#36187d] font-bold text-[15px]">
              8. ADABIYOTLAR RO‘YXATI
            </h1>
            <ul>
              <li>
                - Foydalanilgan adabiyotlar ro‘yxati Mendeley, EndNote va shu
                kabi dasturiy ta'minotlarda yuritish tavsiya etiladi.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Image
            src={abstract}
            alt="img"
            width={800}
            height={800}
            className="w-[1000px] h-[800px]"
          />
        </div>
      </div>
    </div>
  );
}



