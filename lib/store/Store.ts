import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { articleApi } from "@/lib/query/article.query";
import navbarReducer from "@/lib/slice/navbar.slice";
import { volumeApi } from "@/lib/query/volume.query";

const rootReducer = combineReducers({
  navbar: navbarReducer,
  [volumeApi.reducerPath]: volumeApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        articleApi.middleware,
        volumeApi.middleware,
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
