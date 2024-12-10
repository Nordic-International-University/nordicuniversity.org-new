// module.exports = {
//   siteUrl: "https://nordicuniversity.org/",
//   generateRobotsTxt: true,
//   sitemapSize: 7000,
//   alternateRefs: [
//     {
//       href: "https://nordicuniversity.org//uz",
//       hreflang: "uz",
//     },
//     {
//       href: "https://nordicuniversity.org//ru",
//       hreflang: "ru",
//     },
//     {
//       href: "https://nordicuniversity.org//en",
//       hreflang: "en",
//     },
//   ],
//
//   additionalPaths: async (config) => {
//     const paths = [];
//     const languages = ["uz", "ru", "en"];
//     const pages = [
//       "admission/admission-process",
//       "admission/faq",
//       "admission/tuition-fees",
//       "education/certificate",
//       "education/contract-prices",
//       "education/level",
//       "education/resources",
//       "patents/connections",
//       "patents/forum-and-projects",
//       "patents/international-meetings-photos",
//       "patents/scholarships-and-internships",
//       "press-service/news",
//       "press-service/nordic-trend",
//       "press-service/podcast",
//       "research/scientific-conferences",
//       "research/scientific-ejournal",
//       "research/scientific-events",
//       "students/albums",
//       "students/examination-procedures",
//       "students/nordic-life-journal",
//       "students/work-and-travel",
//       "university/advantages",
//       "university/contacts",
//       "university/documents",
//       "university/requisites",
//       "university/structure",
//     ];
//
//     languages.forEach((lang) => {
//       pages.forEach((page) => {
//         paths.push({
//           loc: `${config.siteUrl}/${lang}/${page}`,
//           lastmod: new Date().toISOString(),
//         });
//       });
//     });
//
//     return paths;
//   },
// };
