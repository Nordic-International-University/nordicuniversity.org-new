import { createSlice } from "@reduxjs/toolkit";
import {
  componentReducer,
  componentState,
} from "@/app/utils/reducers/component.reducer";

const initialState: componentState = {
  album: {
    albumVisible: "",
  },
};

const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: componentReducer,
});

export const { changeAlbum } = componentSlice.actions;

export default componentSlice.reducer;
