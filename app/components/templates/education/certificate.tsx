"use client";

import certificateImage from "@/public/images/education-image/certificate.png";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Certificate = () => {
  const t = useTranslations("education.certificate").raw;
  const table = useTranslations("education.table").raw;

  return (
    <section>
      <div className="flex mt-5 max-lg:flex-col items-center gap-4">
        <Image
          className="max-lg:h-24 h-[90px] w-auto"
          src={certificateImage}
          alt="certificate"
        />
        <p
          className="max-lg:text-center max-sm:text-sm"
          dangerouslySetInnerHTML={{ __html: t("description") }}
        ></p>
      </div>
      <div className="flex">
        <div className="sertificate max-sm:text-nowrap overflow-x-auto mt-5 m-auto mb-6">
          <div>
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full overflow-auto mt-6">
                  <tr>
                    <td
                      rowSpan={3}
                      align="center"
                      className="bg-[#5B9BD5] text-white px-2 text-lg font-semibold inter-regular -tracking-tighter"
                    >
                      {table("header.serial")}
                    </td>
                    <td
                      rowSpan={3}
                      align="center"
                      className="w-64 bg-[#5B9BD5] text-white text-lg font-semibold inter-regular -tracking-tighter"
                    >
                      {table("header.certificate_name")}
                    </td>
                    <td
                      colSpan={3}
                      align="center"
                      className="py-2 bg-[#5B9BD5] text-white text-lg font-semibold inter-regular -tracking-tighter"
                    >
                      {table("header.conformity_level")}
                    </td>
                  </tr>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{ __html: table("cefr") }}
                      colSpan={3}
                      className="py-2 text-black text-lg font-normal bg-[#D2DEEF] inter-regular -tracking-tighter"
                      align="center"
                    ></td>
                  </tr>
                  <tr>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#EAEFF7]"
                      align="center"
                    >
                      B2
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#EAEFF7] inter-regular"
                      align="center"
                    >
                      C1
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#EAEFF7] inter-regular"
                      align="center"
                    ></td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-1 font-normal bg-[#D2DEEF] inter-regular"
                    >
                      1.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#D2DEEF] inter-regular"
                    >
                      {t("certificate_type")}
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#D2DEEF]"
                      align="center"
                    >
                      B2
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    >
                      C1
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    >
                      C2
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={5}
                      align="center"
                      className="py-2.5 bg-[#EAEFF7] text-lg font-semibold inter-bold"
                    >
                      {table("english_language")}
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-1 font-normal bg-[#D2DEEF] inter-regular"
                    >
                      2.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#D2DEEF] inter-regular"
                    >
                      IELTS
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#D2DEEF]"
                      align="center"
                    >
                      5,5 – 6,5
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    >
                      7,0 – 8,0
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    >
                      8,5 – 9,0
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-1 font-normal bg-[#EAEFF7] inter-regular"
                    >
                      3.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#EAEFF7] inter-regular"
                    >
                      TOEFL iBT
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#EAEFF7]"
                      align="center"
                    >
                      72 – 94
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#EAEFF7] inter-regular"
                      align="center"
                    >
                      95 – 113
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#EAEFF7] inter-regular"
                      align="center"
                    >
                      114 – 120
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-1 font-normal bg-[#D2DEEF] inter-regular"
                    >
                      4.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#D2DEEF] inter-regular"
                    >
                      TOEFL ITP
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#D2DEEF]"
                      align="center"
                    >
                      543 – 626
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    >
                      627 – 677
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    ></td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-8 font-normal bg-[#D2DEEF] inter-regular"
                    >
                      5.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#D2DEEF] inter-regular"
                    >
                      Cambridge Assessment English Linguaskill
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#D2DEEF]"
                      align="center"
                    >
                      160 – 179
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    >
                      180 +
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    ></td>
                  </tr>
                  <tr>
                    <td
                      colSpan={5}
                      align="center"
                      className="py-2.5 bg-[#5B9BD5] text-lg text-white -tracking-tighter font-semibold inter-bold"
                    >
                      {table("french_language")}
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-1 font-normal bg-[#D2DEEF] inter-regular"
                    >
                      6.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#D2DEEF] inter-regular"
                    >
                      DELF
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#D2DEEF]"
                      align="center"
                    >
                      DELF B2
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    ></td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    ></td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-1 font-normal bg-[#EAEFF7] inter-regular"
                    >
                      7.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#EAEFF7] inter-regular"
                    >
                      DALF
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#EAEFF7]"
                      align="center"
                    ></td>
                    <td
                      className="py-2 text-lg font-normal bg-[#EAEFF7] inter-regular"
                      align="center"
                    >
                      DALF C1
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#EAEFF7] inter-regular"
                      align="center"
                    >
                      DALF C2
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-1 font-normal bg-[#D2DEEF] inter-regular"
                    >
                      8.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#D2DEEF] inter-regular"
                    >
                      TCF
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#D2DEEF]"
                      align="center"
                    >
                      B2
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    >
                      C1
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    ></td>
                  </tr>
                  <tr>
                    <td
                      colSpan={5}
                      align="center"
                      className="py-2.5 bg-[#EAEFF7] text-lg text-black -tracking-tighter font-semibold inter-bold"
                    >
                      {table("german_language")}
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-10 font-normal bg-[#D2DEEF] inter-regular"
                    >
                      9.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#D2DEEF] inter-regular"
                    >
                      GOETHE-ZERTIFIKAT
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#D2DEEF]"
                      align="center"
                    >
                      Goethe-Zertifikat B2
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    >
                      Goethe-Zertifikat C1
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#D2DEEF] inter-regular"
                      align="center"
                    >
                      Goethe-Zertifikat C2 GroBes Deutsches Sprachdiplom C2
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      className="text-lg py-1 font-normal bg-[#EAEFF7] inter-regular"
                    >
                      10.
                    </td>
                    <td
                      align="center"
                      className="text-lg font-normal bg-[#EAEFF7] inter-regular"
                    >
                      Deutsches Sprachdiplom (DSD II)
                    </td>
                    <td
                      className="py-2 text-lg font-normal inter-regular bg-[#EAEFF7]"
                      align="center"
                    >
                      TDN 4 ( B2.2 – C1.1 ) TDN 3 ( B2.1 )
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#EAEFF7] inter-regular"
                      align="center"
                    >
                      TDN 5 ( C1.2 )
                    </td>
                    <td
                      className="py-2 text-lg font-normal bg-[#EAEFF7] inter-regular"
                      align="center"
                    ></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span>
        <hr />
      </span>
    </section>
  );
};

export default Certificate;
