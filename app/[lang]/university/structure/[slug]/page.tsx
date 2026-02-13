import React from "react";
import {
  singleStructurePageParams,
  structureBySLug,
  Staff,
} from "@/types/templates/structure.types";
import BroadCamp from "@/app/components/UI/broadCump";
import { getTranslations } from "next-intl/server";
import {
  getAllStructureByType,
  getAllStructuresBySlug,
} from "@/app/[lang]/university/structure/apiCalls";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Users,
  Mail,
  FileText,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import SocialLinks from "@/app/components/UI/SocialLinks";

// Staff Card
const StaffDetailCard = ({
  staff,
  index,
}: {
  staff: Staff;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex max-md:flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
      border border-gray-200 rounded-xl bg-white overflow-hidden h-[320px] max-md:h-auto
      hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200`}>
      {/* Image */}
      <div className="md:w-[260px] flex-shrink-0 relative max-md:h-56">
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.image.file_path}`}
          alt={staff.full_name}
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-5 lg:p-6 flex flex-col min-h-0">
        <span className="text-text_secondary text-sm font-semibold uppercase tracking-wider flex-shrink-0">
          {staff.position}
        </span>

        <h3 className="text-text_secondary text-xl font-bold mt-1.5 mb-3 flex-shrink-0">
          {staff.full_name}
        </h3>

        {/* Scrollable description */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <div
            className="ql-editor text-gray-500 text-[15px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: staff.description }}
          />
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
          <SocialLinks
            className="!mt-0"
            social_network_links={staff.social_network_links}
          />

          {staff.resume_file && (
            <Link
              href={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.resume_file.file_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-text_secondary text-white rounded-lg text-sm font-medium hover:bg-text_secondary/90 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>CV</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = async ({ params: { slug } }: singleStructurePageParams) => {
  const t = await getTranslations("university");
  const staffData: structureBySLug | any = await getAllStructuresBySlug(
    await getCurrentLangServer(),
    slug,
  );

  const allStructuresByType = await getAllStructureByType(
    await getCurrentLangServer(),
    staffData.type,
  );

  const breadcrumbItems = [
    {
      url: "/university/advantages",
      name: t("document.university"),
    },
    {
      url: "/university/structure",
      name: t("structure.sectionName"),
    },
    {
      url: `/university/structure/${slug}`,
      name: staffData.name,
    },
  ];

  // Find current index for navigation
  const currentIndex = allStructuresByType.findIndex(
    (item) => item.slug === slug
  );
  const prevItem = currentIndex > 0 ? allStructuresByType[currentIndex - 1] : null;
  const nextItem =
    currentIndex < allStructuresByType.length - 1
      ? allStructuresByType[currentIndex + 1]
      : null;

  return (
    <article className="mt-8 mb-16">
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <BroadCamp items={[breadcrumbItems]} />
          <Link
            href="/university/structure"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-text_secondary mt-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t("structure.sectionName")}</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex flex-col max-h-[65vh] overflow-y-auto">
                {allStructuresByType.map((item, index) => (
                  <Link
                    key={index}
                    href={`/university/structure/${item.slug}`}
                    className={`py-2.5 px-3 text-[15px] font-medium border-l-2 transition-all duration-200 ${
                      item.slug === slug
                        ? "border-text_secondary text-text_secondary bg-text_secondary/5"
                        : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800"
                    }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item.name }} />
                  </Link>
                ))}
              </nav>

              {/* Mobile Dropdown */}
              <details className="lg:hidden border border-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-gray-700 text-base font-medium bg-gray-50">
                  <span>{t("structure.sectionName")}</span>
                  <ChevronRight className="w-5 h-5" />
                </summary>
                <div className="max-h-60 overflow-y-auto">
                  {allStructuresByType.map((item, index) => (
                    <Link
                      key={index}
                      href={`/university/structure/${item.slug}`}
                      className={`block px-4 py-2.5 text-sm border-b border-gray-100 last:border-b-0 transition-colors ${
                        item.slug === slug
                          ? "bg-text_secondary/5 text-text_secondary font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span dangerouslySetInnerHTML={{ __html: item.name }} />
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {staffData && (
              <>
                {/* Page Title */}
                <h1 className="text-text_secondary text-2xl lg:text-[28px] font-bold mb-2">
                  {staffData.name}
                </h1>
                {staffData.staffs && staffData.staffs.length > 0 && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
                    <Users className="w-4 h-4" />
                    <span>{staffData.staffs.length} {t("structure.employees").toLowerCase()}</span>
                  </div>
                )}

                {/* Image */}
                <div className="rounded-xl overflow-hidden border border-gray-200 mb-8">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staffData.image.file_path}`}
                    width={1000}
                    height={500}
                    className="w-full h-auto object-cover max-h-[360px]"
                    alt={staffData.name}
                  />
                </div>

                {/* Mission */}
                {staffData.mission && (
                  <div className="mb-10">
                    <h2 className="text-text_secondary text-xl font-bold mb-4">
                      {t("structure.task")}
                    </h2>
                    <div
                      className="ql-editor text-gray-600 text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: staffData.mission }}
                    />
                  </div>
                )}

                {/* Staff */}
                {staffData.staffs && staffData.staffs.length > 0 && (
                  <div>
                    <h2 className="text-text_secondary text-xl font-bold mb-5">
                      {t("structure.employees")}
                    </h2>

                    <div className="flex flex-col gap-5">
                      {staffData.staffs.map((staff: Staff, index: number) => (
                        <StaffDetailCard
                          key={staff.id}
                          staff={staff}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                {(prevItem || nextItem) && (
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
                    {prevItem ? (
                      <Link
                        href={`/university/structure/${prevItem.slug}`}
                        className="group flex items-center gap-3 text-gray-500 hover:text-text_secondary transition-colors"
                      >
                        <div className="w-9 h-9 rounded-full border border-gray-200 group-hover:border-text_secondary/30 flex items-center justify-center transition-colors">
                          <ArrowLeft className="w-4 h-4" />
                        </div>
                        <div className="max-w-[200px]">
                          <span className="text-xs text-gray-400 block">Oldingi</span>
                          <span
                            className="text-sm font-medium line-clamp-1"
                            dangerouslySetInnerHTML={{ __html: prevItem.name }}
                          />
                        </div>
                      </Link>
                    ) : (
                      <div />
                    )}

                    {nextItem && (
                      <Link
                        href={`/university/structure/${nextItem.slug}`}
                        className="group flex items-center gap-3 text-gray-500 hover:text-text_secondary transition-colors text-right"
                      >
                        <div className="max-w-[200px]">
                          <span className="text-xs text-gray-400 block">Keyingi</span>
                          <span
                            className="text-sm font-medium line-clamp-1"
                            dangerouslySetInnerHTML={{ __html: nextItem.name }}
                          />
                        </div>
                        <div className="w-9 h-9 rounded-full border border-gray-200 group-hover:border-text_secondary/30 flex items-center justify-center transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Page;