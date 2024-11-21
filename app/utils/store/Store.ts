import { configureStore } from "@reduxjs/toolkit";
import sideBarItems from "@/app/utils/slices/navbar.slice";
import createSearchSlice from "@/app/utils/slices/search.slice";
import componentSlice from "@/app/utils/slices/component.function";
import menuSlice from "@/app/utils/slices/menuItem.slice";

export const Store = configureStore({
  reducer: {
    sideBar: sideBarItems,
    search: createSearchSlice,
    component: componentSlice,
    menuSlice: menuSlice,
  },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

export default Store;
