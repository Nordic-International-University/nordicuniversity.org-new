import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import navReducer from "@/app/utils/reducers/navbar.reducer";
import axios from "axios";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";

const initialState: any = {
  university: {
    documentsSidebarItem: [
      {
        name: "subItems.0",
        url: "/university/advantages",
      },
      {
        name: "subItems.1",
        url: "/university/year-end-review",
      },
      {
        name: "subItems.2",
        url: "/university/documents",
      },
      {
        name: "subItems.3",
        url: "/university/structure",
      },
      {
        name: "subItems.4",
        url: "/university/requisites",
      },
      {
        name: "subItems.5",
        url: "/university/contacts",
      },
    ],
    researchSidebarItems: [
      {
        name: "subItems.0",
        url: "/research/doctorate",
      },
      {
        name: "subItems.1",
        url: "/research/scientific-ejournal",
      },
      {
        name: "subItems.2",
        url: "/research/scientific-events",
      },
      {
        name: "subItems.3",
        url: "/research/scientific-conferences",
      },
      {
        name: "subItems.4",
        url: "/research/tasimo-olympiad",
      },
      {
        name: "subItems.5",
        url: "/research/patents",
      },
      {
        name: "subItems.6",
        url: "/research/certificates",
      },
      {
        name: "subItems.7",
        url: "/research/scientific-council",
      },
    ],
  },
  admission: {
    admissionSidebarItems: [
      {
        name: "subItems.0",
        url: "/admission/admission-process",
      },
      {
        name: "subItems.1",
        url: "/admission/faq",
      },
      {
        name: "subItems.2",
        url: "/admission/tuition-fees",
      },
    ],
  },
  education: {
    educationSidebarItems: [
      {
        name: "subItems.0",
        url: "/education/level",
      },
      {
        name: "subItems.1",
        url: "/education/resources",
      },
      {
        name: "subItems.2",
        url: "/education/certificate",
      },
      {
        name: "subItems.3",
        url: "/education/contract-prices",
      },
      {
        name: "subItems.4",
        url: "/education/academic-process",
      },
    ],
  },
  partners: {
    educationSidebarItems: [
      {
        name: "subItems.0",
        url: "/partners/connections",
      },
      {
        name: "subItems.1",
        url: "/partners/scholarships-and-internships",
      },
      {
        name: "subItems.2",
        url: "/partners/forum-and-projects",
      },
      {
        name: "subItems.3",
        url: "/partners/international-meetings-photos",
      },
    ],
  },
  students: {
    studentsSidebarItems: [
      {
        name: "subItems.1",
        url: "/students/examination-procedures",
      },
      {
        name: "subItems.0",
        url: "/students/work-and-travel",
      },
      {
        name: "subItems.2",
        url: "/students/nordic-life-journal",
      },
      {
        name: "subItems.3",
        url: "/students/codes-and-manuals",
      },
      {
        name: "subItems.4",
        url: "/students/albums",
      },
    ],
  },
  press_service: {
    pressServiceSidebarItems: [
      {
        name: "subItems.0",
        url: "/press-service/news",
      },
      {
        name: "subItems.1",
        url: "/press-service/releases",
      },
      {
        name: "subItems.2",
        url: "/press-service/podcast",
      },
      {
        name: "subItems.3",
        url: "/press-service/nordic-trend",
      },
      {
        name: "subItems.4",
        url: "/press-service/nordic-and-mass-media",
      },
      {
        name: "subItems.5",
        url: "/press-service/audio-books",
      },
    ],
  },
  nordic_school: {
    nordicSchoolSidebarItems: [
      {
        name: "subItems.0",
        url: "/nordic-school/about",
      },
      {
        name: "subItems.1",
        url: "/nordic-school/gallery",
      },
      {
        name: "subItems.2",
        url: "/nordic-school/contacts",
      },
    ],
  },
};

initialState.menuItems = [
  {
    name: "UNIVERSITET",
    menuTransKey: "university",
    url: "/university/advantages",
    transKey: "university.document",
    subItems: initialState.university.documentsSidebarItem,
  },
  {
    name: "QABUL",
    menuTransKey: "admission",
    url: "/admission/admission-process",
    transKey: "admission",
    subItems: initialState.admission.admissionSidebarItems,
  },
  {
    name: "TA'LIM",
    menuTransKey: "education",
    url: "/education/level",
    transKey: "education",
    subItems: initialState.education.educationSidebarItems,
  },
  {
    name: "ILM FAN",
    menuTransKey: "science",
    url: "/research/scientific-ejournal",
    transKey: "research",
    subItems: initialState.university.researchSidebarItems,
  },
  {
    name: "HAMKORLIK",
    menuTransKey: "partnership",
    url: "/partners/connections",
    transKey: "partners",
    subItems: initialState.partners.educationSidebarItems,
  },
  {
    name: "TALABALARGA",
    menuTransKey: "students",
    url: "/students/examination-procedures",
    transKey: "student",
    subItems: initialState.students.studentsSidebarItems,
  },
  {
    name: "MATBUOT XIZMATI",
    menuTransKey: "press",
    url: "/press-service/news",
    transKey: "press-service",
    subItems: initialState.press_service.pressServiceSidebarItems,
  },
  {
    name: "NORDIK MAKTABI",
    menuTransKey: "school",
    url: "/press-service/news",
    transKey: "nordic_school",
    subItems: initialState.nordic_school.nordicSchoolSidebarItems,
  },
];

export const fetchSubPages = createAsyncThunk<any, string>(
  "menu/fetchSubPages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/subpages?language=${getCurrentLangClient()}`,
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch subpages");
    }
  },
);

const SidebarItem = createSlice({
  name: "sideBarItems",
  initialState,
  reducers: navReducer,
  extraReducers: (builder) => {
    builder.addCase(fetchSubPages.fulfilled, (state, action) => {
      const subPages = action.payload;

      state.menuItems.forEach((menuItem: any) => {
        menuItem.subItems = menuItem.subItems.filter(
          (item: any) => !item.url.includes("/dynamic/"),
        );
      });

      subPages.forEach((subPage: any) => {
        const menuIndex = state.menuItems.findIndex(
          (menuItem: any) => menuItem.transKey === subPage.related_page,
        );

        if (menuIndex !== -1) {
          const baseUrl = state.menuItems[menuIndex].url.split("/")[1];
          state.menuItems[menuIndex].subItems.push({
            name: subPage.name,
            url: `/${baseUrl}/dynamic/${subPage.slug}`,
            id: subPage.id,
          });
        }
      });
    });
  },
});

export default SidebarItem.reducer;
