import { createSlice } from "@reduxjs/toolkit";
import navReducer from "@/app/utils/reducers/navbar.reducer";

const initialState: any = {
  university: {
    documentsSidebarItem: [
      {
        name: "subItems.0",
        url: "/university/advantages",
      },
      {
        name: "subItems.1",
        url: "/university/documents",
      },
      {
        name: "subItems.2",
        url: "/university/structure",
      },
      {
        name: "subItems.3",
        url: "/university/requisites",
      },

      {
        name: "subItems.4",
        url: "/university/contacts",
      },
    ],
    researchSidebarItems: [
      {
        name: "subItems.0",
        url: "/research/scientific-ejournal",
      },
      {
        name: "subItems.1",
        url: "/research/scientific-events",
      },
      {
        name: "subItems.2",
        url: "/research/scientific-conferences",
      },
      {
        name: "subItems.3",
        url: "/research/tasimo-olympiad",
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
    ],
  },
  partners: {
    educationSidebarItems: [
      {
        name: "subItems.1",
        url: "/partners/connections",
      },
      {
        name: "subItems.0",
        url: "/partners/scholarships-and-internships",
      },
      {
        name: "subItems.2",
        url: "/partners/forum-and-projects",
      },
      {
        name: "subItems.3",
        url: "/partners/contract-prices",
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
    ],
  },
};

initialState.menuItems = [
  {
    name: "UNIVERSITET",
    url: "/university/advantages",
    transKey: "university.document",
    subItems: initialState.university.documentsSidebarItem,
  },
  {
    name: "QABUL",
    url: "/admission/admission-process",
    transKey: "research",
    subItems: initialState.admission.admissionSidebarItems,
  },
  {
    name: "TA'LIM",
    url: "/education/level",
    transKey: "education",
    subItems: initialState.education.educationSidebarItems,
  },
  {
    name: "ILM FAN",
    url: "/research/scientific-ejournal",
    transKey: "research",
    subItems: initialState.university.researchSidebarItems,
  },
  {
    name: "HAMKORLIK",
    url: "/partners/scholarships-and-internships",
    transKey: "partners",
    subItems: initialState.partners.educationSidebarItems,
  },
  {
    name: "TALABALARGA",
    url: "/student",
    transKey: "student",
    subItems: initialState.students.studentsSidebarItems,
  },
  {
    name: "MATBUOT XIZMATI",
    url: "/press-service",
    transKey: "student",
    subItems: initialState.press_service.pressServiceSidebarItems,
  },
];

const SidebarItem = createSlice({
  name: "sideBarItems",
  initialState,
  reducers: navReducer,
});

export default SidebarItem.reducer;
