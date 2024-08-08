"use client";

import React, { useEffect } from "react";
import { VolumePropsInterface } from "@/types/home.types";

const HomeVolumesClient = ({ volume }: VolumePropsInterface) => {
  useEffect(() => {
    console.log(volume);
  }, []);

  return <div></div>;
};

export default HomeVolumesClient;
