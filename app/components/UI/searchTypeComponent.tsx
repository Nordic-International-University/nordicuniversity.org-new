"use client";
import React, { FC } from "react";
import { Button } from "antd";
import { useTranslations } from "next-intl";

export enum EnumTypeSearch {
  All = "all",
  FAQ = "faq",
  NEWS = "news",
  SCIENCE = "science",
  PODCASTS = "podcasts",
  FIELDS = "fields",
  COOPERATION = "cooperation",
  EDU_RESOURCES = "eduResources",
  PRESS_RELEASES = "pressReleases",
  NORDIC_LIFE = "nordicLife",
  ORG_STRUCTURE = "orgStructure",
  STAFF = "staff",
}

const SearchTypeComponent: FC<{ query: string; onChange: any }> = ({
  query,
  onChange,
}) => {
  const t = useTranslations("searchType");

  return (
    <div className="mt-6 flex items-center justify-center flex-wrap gap-3">
      {Object.values(EnumTypeSearch).map((type) => (
        <Button
          onClick={() => {
            onChange(type);
          }}
          type={query === type ? "primary" : "default"}
          href={`?type=${type}`}
        >
          {t(`${type}`)}
        </Button>
      ))}
    </div>
  );
};

export default SearchTypeComponent;
