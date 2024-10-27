"use client";

import { Provider } from "react-redux";
import { Store } from "@/app/utils/store/Store";
import { ReactNode } from "react";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={Store}>{children}</Provider>;
};
