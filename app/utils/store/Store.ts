import { configureStore } from "@reduxjs/toolkit";
import sideBarItems from "@/app/utils/slices/navbar.slice";

export const Store = configureStore({
  reducer: {
    sideBar: sideBarItems,
  },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

export default Store;
