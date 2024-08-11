import { createSlice } from "@reduxjs/toolkit";
import { navbarInitialState } from "@/types/navbar.types";
import { navbarReducer } from "@/lib/reducer/navbar.reducer";

const initialState: navbarInitialState = {
  isOpen: false,
  menuItems: [
    { path: "/about", name: "Jurnal haqida", active: false },
    { path: "/instruction", name: "Yo’riqnoma", active: false },
    { path: "/nashrlar", name: "Nashrlar", active: false },
    { path: "/asosiy-yonalishlar", name: "Asosiy yo’nalishlar", active: false },
    { path: "/boglanish", name: "Bog’lanish", active: false },
  ],
};

const navbarSLice = createSlice({
  name: "navbar",
  initialState: initialState,
  reducers: navbarReducer,
});

export const { openMenu, closeMenu } = navbarSLice.actions;

export default navbarSLice.reducer;
