import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";

const LOCALES_PATH = path.join(process.cwd(), "locales");
const APP_PATH = path.join(process.cwd(), "app");

const flattenLocaleData = (
  obj: any,
  prefix = "",
): { path: string; text: string; sectionTitle?: string }[] => {
  return Object.entries(obj).flatMap(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    const isSectionTitle = [
      "section_title",
      "sectionName",
      "sectionTitle",
    ].includes(key);

    if (typeof value === "string") {
      return [
        {
          path: newKey,
          text: value,
          sectionTitle: isSectionTitle ? value : undefined,
        },
      ];
    } else if (typeof value === "object" && value !== null) {
      return flattenLocaleData(value, newKey);
    }
    return [];
  });
};

const readLocaleFile = (lang: string) => {
  const localePath = path.join(LOCALES_PATH, `${lang}.json`);
  if (fs.existsSync(localePath)) {
    return JSON.parse(fs.readFileSync(localePath, "utf-8"));
  }
  return null;
};

const extractTranslationKeys = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const useTranslationsMatch = fileContent.match(
    /useTranslations\("([^"]+)"\)/,
  );
  const namespace = useTranslationsMatch ? useTranslationsMatch[1] : null;

  if (!namespace) return [];
  const tMatches = fileContent.match(/t\("([^"]+?)"\)/g);
  const keys = tMatches
    ? tMatches
        .map((match) => match.match(/t\("([^"]+?)"\)/)?.[1] || "")
        .filter(Boolean)
    : [];

  return keys.map((key) => `${namespace}.${key}`);
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query");
  const lang = searchParams.get("lang");

  if (!query || !lang) {
    return NextResponse.json(
      { error: "Both query and lang parameters are required" },
      { status: 400 },
    );
  }

  const resultsMap = new Map<
    string,
    { route: string; includedText: any[]; sectionTitle?: string }
  >();
  const localeData = readLocaleFile(lang);
  if (!localeData) {
    return NextResponse.json(
      { error: "Locale file not found" },
      { status: 404 },
    );
  }

  const flattenedLocaleData = flattenLocaleData(localeData);

  const fuse = new Fuse(flattenedLocaleData, {
    keys: ["text"],
    threshold: 0,
    distance: 100,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  const checkFilesInDir = (dirPath: string) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        checkFilesInDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
        const translationKeys = extractTranslationKeys(fullPath);
        for (const key of translationKeys) {
          const fuzzyResults = fuse.search(query);

          for (const result of fuzzyResults) {
            const currentObj = result.item;
            if (currentObj && currentObj.path === key) {
              let route = fullPath
                .replace(process.cwd(), "")
                .replace(/\\/g, "/");

              if (route.startsWith("/app/components/templates")) {
                route = route
                  .replace("/app/components/templates", "")
                  .replace(/_/g, "-")
                  .replace(".tsx", "");
              } else {
                route = route
                  .replace("/app/[lang]/", `/${lang}/`)
                  .replace("/ClientPage.tsx", "")
                  .replace(`/${lang}`, "");
              }

              const matchingSectionTitle = flattenedLocaleData.find(
                (item) =>
                  item.path.startsWith(key.split(".")[0]) && item.sectionTitle,
              );

              if (!resultsMap.has(route)) {
                resultsMap.set(route, {
                  route,
                  includedText: [],
                  sectionTitle: matchingSectionTitle
                    ? matchingSectionTitle.sectionTitle
                    : undefined,
                });
              }

              const existingRoute = resultsMap.get(route);
              if (
                existingRoute &&
                !existingRoute.includedText.some(
                  (item) => item.text === currentObj.text,
                )
              ) {
                existingRoute.includedText.push({
                  path: currentObj.path,
                  text: currentObj.text,
                });
              }
            }
          }
        }
      }
    }
  };

  checkFilesInDir(APP_PATH);

  const results = Array.from(resultsMap.values()).map((result) => ({
    ...result,
    includedText: result.includedText.map((textObj) => ({
      path: textObj.path,
      text: textObj.text,
    })),
  }));

  return NextResponse.json(results);
}
