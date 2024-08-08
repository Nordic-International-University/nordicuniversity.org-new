"use client";

import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store/Store";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={makeStore()}>{children}</Provider>;
};

export default StoreProvider;
