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
        url: "/university/tuzilma",
      },
      {
        name: "document.subItems.3",
        url: "/university/tuzilma",
      },

      {
        name: "document.subItems.4",
        url: "/university/tuzilma",
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
