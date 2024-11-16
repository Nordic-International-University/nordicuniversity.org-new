import { createSlice } from "@reduxjs/toolkit";
import { searchReducer } from "@/app/utils/reducers/search.reducer";

export interface searchInitialState {
  isOpenSearch: boolean;
}

const initialState: searchInitialState = {
  isOpenSearch: false,
};

const createSearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: searchReducer,
});

export const { handleOpenSearchModal, handleCloseSearchModal } =
  createSearchSlice.actions;
export default createSearchSlice.reducer;
