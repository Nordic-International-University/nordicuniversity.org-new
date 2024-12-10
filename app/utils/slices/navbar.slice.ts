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
        name: "subItems.4",
        url: "/university/contacts",
      },
      {
        name: "subItems.5",
        url: "/university/patents",
      },
      {
        name: "subItems.3",
        url: "/university/requisites",
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
];

const SidebarItem = createSlice({
  name: "sideBarItems",
  initialState,
  reducers: navReducer,
});

export default SidebarItem.reducer;
