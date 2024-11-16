import { searchInitialState } from "@/app/utils/slices/search.slice";

export const searchReducer = {
  handleOpenSearchModal: (state: searchInitialState) => {
    state.isOpenSearch = true;
  },
  handleCloseSearchModal: (state: searchInitialState) => {
    state.isOpenSearch = false;
  },
};
