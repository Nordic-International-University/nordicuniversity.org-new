import { PayloadAction } from "@reduxjs/toolkit";

export interface componentState {
  album: {
    albumVisible: string;
  };
}

export const componentReducer = {
  changeAlbum: (state: componentState, action: PayloadAction<string>) => {
    state.album.albumVisible = action.payload;
  },
};
