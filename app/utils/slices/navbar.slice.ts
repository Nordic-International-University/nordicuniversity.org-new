import { createSlice } from "@reduxjs/toolkit";
import navReducer from "@/app/utils/reducers/navbar.reducer";

const initialState = {
  university: {
    documentsSidebarItem: [
      {
        name: "document.subItems.0",
        url: "/university/advantages",
      },
      {
        name: "document.subItems.1",
        url: "/university/documents",
      },
      {
        name: "document.subItems.2",
        url: "/university/structure",
      },
      {
        name: "document.subItems.3",
        url: "/university/requisites",
      },

      {
        name: "document.subItems.4",
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
        url: "/education/certificate",
      },
      {
        name: "subItems.3",
        url: "/education/contract-prices",
      },
    ],
  },
};

const SidebarItem = createSlice({
  name: "sideBarItems",
  initialState,
  reducers: navReducer,
});

export default SidebarItem.reducer;
