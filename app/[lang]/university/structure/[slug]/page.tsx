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

// Staff Card Component for detail page
const StaffDetailCard = ({
  staff,
  index,
}: {
  staff: Staff;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className="group bg-white rounded-2xl border border-tertiary/10 overflow-hidden hover:shadow-xl hover:shadow-text_secondary/10 transition-all duration-500">
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Image Section */}
        <div className="md:w-1/3 relative">
          <div className="aspect-square md:aspect-auto md:h-full relative overflow-hidden bg-gradient-to-br from-text_secondary/10 to-tertiary/10">
            <Image
              width={400}
              height={400}
              src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.image.file_path}`}
              alt={staff.full_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-tertiary/60 via-transparent to-transparent md:bg-gradient-to-${isEven ? 'r' : 'l'} md:from-transparent md:to-tertiary/10`} />
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 p-6 lg:p-8 flex flex-col justify-center">
          {/* Position */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-1 bg-gradient-to-r from-text_secondary to-text_secondary/50 rounded-full" />
            <span className="text-text_secondary text-sm font-semibold uppercase tracking-wider">
              {staff.position}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-tertiary text-xl lg:text-2xl font-bold mb-4 group-hover:text-text_secondary transition-colors">
            {staff.full_name}
          </h3>

          {/* Description */}
          <div
            className="ql-editor text-tertiary/70 text-sm lg:text-base leading-relaxed line-clamp-4"
            dangerouslySetInnerHTML={{ __html: staff.description }}
          />

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-tertiary/10">
            <SocialLinks
              className="!mt-0"
              social_network_links={staff.social_network_links}
            />

            {staff.resume_file && (
              <Link
                href={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.resume_file.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-text_secondary text-white rounded-xl text-sm font-medium hover:bg-text_secondary/90 hover:shadow-lg transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>CV</span>
              </Link>
            )}
          </div>
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
        {/* Breadcrumb */}
        <BroadCamp items={[breadcrumbItems]} />

        {/* Back Button */}
        <Link
          href="/university/structure"
          className="inline-flex items-center gap-2 text-tertiary/60 hover:text-text_secondary mt-4 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">{t("structure.sectionName")}</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Section Title */}
              <div className="hidden lg:flex items-center gap-3 mb-4 pb-4 border-b border-tertiary/10">
                <div className="w-10 h-10 rounded-xl bg-text_secondary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-text_secondary" />
                </div>
                <span className="text-tertiary font-semibold text-sm">
                  {t("structure.sectionName")}
                </span>
              </div>

              {/* Navigation List */}
              <nav className="hidden lg:block space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {allStructuresByType.map((item, index) => (
                  <Link
                    key={index}
                    href={`/university/structure/${item.slug}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      item.slug === slug
                        ? "bg-text_secondary text-white shadow-lg shadow-text_secondary/20"
                        : "bg-box_color text-tertiary hover:bg-text_secondary/10 hover:text-text_secondary"
                    }`}
                  >
                    <span
                      className="text-sm font-medium line-clamp-1 flex-1"
                      dangerouslySetInnerHTML={{ __html: item.name }}
                    />
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${item.slug === slug ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
                  </Link>
                ))}
              </nav>

              {/* Mobile Dropdown */}
              <details className="lg:hidden bg-box_color rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-tertiary font-medium">
                  <span>{t("structure.sectionName")}</span>
                  <ChevronRight className="w-5 h-5 transition-transform details-open:rotate-90" />
                </summary>
                <div className="px-2 pb-2 max-h-60 overflow-y-auto">
                  {allStructuresByType.map((item, index) => (
                    <Link
                      key={index}
                      href={`/university/structure/${item.slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        item.slug === slug
                          ? "bg-text_secondary text-white"
                          : "text-tertiary hover:bg-white"
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
                {/* Hero Section */}
                <div className="relative rounded-2xl overflow-hidden mb-10">
                  {/* Background Image */}
                  <div className="relative h-64 lg:h-80">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staffData.image.file_path}`}
                      fill
                      className="object-cover"
                      alt={staffData.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-tertiary/60 to-tertiary/20" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <h1 className="text-white text-2xl lg:text-3xl font-bold mb-2">
                      {staffData.name}
                    </h1>
                    {staffData.staffs && staffData.staffs.length > 0 && (
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{staffData.staffs.length} {t("structure.employees").toLowerCase()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mission Section */}
                {staffData.mission && (
                  <div className="bg-white rounded-2xl border border-tertiary/10 p-6 lg:p-8 mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-text_secondary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-text_secondary" />
                      </div>
                      <h2 className="text-tertiary text-xl font-bold">
                        {t("structure.task")}
                      </h2>
                    </div>
                    <div
                      className="ql-editor text-tertiary/80 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: staffData.mission }}
                    />
                  </div>
                )}

                {/* Staff Section */}
                {staffData.staffs && staffData.staffs.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-text_secondary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-text_secondary" />
                      </div>
                      <h2 className="text-tertiary text-xl font-bold">
                        {t("structure.employees")}
                      </h2>
                    </div>

                    <div className="space-y-6">
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

                {/* Navigation Between Items */}
                {(prevItem || nextItem) && (
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-tertiary/10">
                    {prevItem ? (
                      <Link
                        href={`/university/structure/${prevItem.slug}`}
                        className="group flex items-center gap-3 text-tertiary hover:text-text_secondary transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-box_color group-hover:bg-text_secondary/10 flex items-center justify-center transition-colors">
                          <ArrowLeft className="w-5 h-5" />
                        </div>
                        <div className="max-w-[200px]">
                          <span className="text-xs text-tertiary/50 block">Oldingi</span>
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
                        className="group flex items-center gap-3 text-tertiary hover:text-text_secondary transition-colors text-right"
                      >
                        <div className="max-w-[200px]">
                          <span className="text-xs text-tertiary/50 block">Keyingi</span>
                          <span
                            className="text-sm font-medium line-clamp-1"
                            dangerouslySetInnerHTML={{ __html: nextItem.name }}
                          />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-box_color group-hover:bg-text_secondary/10 flex items-center justify-center transition-colors">
                          <ChevronRight className="w-5 h-5" />
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