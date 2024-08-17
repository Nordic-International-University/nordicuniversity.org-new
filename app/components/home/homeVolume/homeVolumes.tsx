import React from "react";
import Store, { AppDispatch } from "@/lib/store/Store";
import HomeVolumesClient from "@/app/components/home/homeVolume/HomeVolumesClient";
import { volumeApi } from "@/lib/query/volume.query";

const HomeVolumes = async () => {
  const dispatch = Store.dispatch as AppDispatch;
  // @ts-ignore
  const result = await dispatch(volumeApi.endpoints.getVolumes.initiate());
  // @ts-ignore
  const data = result.data;

  return <HomeVolumesClient volume={data} />;
};

export const dynamic = "force-dynamic";

export default HomeVolumes;
