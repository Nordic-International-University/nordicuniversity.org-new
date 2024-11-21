import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  activeMenu: boolean;
}

const initialState: MenuState = {
  activeMenu: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<boolean>) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = menuSlice.actions;

export default menuSlice.reducer;
