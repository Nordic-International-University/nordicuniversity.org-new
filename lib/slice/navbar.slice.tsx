import { createSlice } from "@reduxjs/toolkit";
import { navbarInitialState } from "@/types/navbar.types";
import { navbarReducer } from "@/lib/reducer/navbar.reducer";

const initialState: navbarInitialState = {
  isOpen: false,
};

const navbarSLice = createSlice({
  name: "navbar",
  initialState: initialState,
  reducers: navbarReducer,
});

export const { openMenu, closeMenu } = navbarSLice.actions;

export default navbarSLice.reducer;
