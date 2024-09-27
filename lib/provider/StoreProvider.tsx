"use client";

import React from "react";
import {Provider} from "react-redux";
import Store from "@/lib/store/Store";

const StoreProvider = ({children}: { children: React.ReactNode }) => {
    return <Provider store={Store}>{children}</Provider>;
};

export default StoreProvider;
