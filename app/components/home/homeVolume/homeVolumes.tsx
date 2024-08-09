import React from "react";
import { AppDispatch, makeStore } from "@/lib/store/Store";
import HomeVolumesClient from "@/app/components/home/homeVolume/HomeVolumesClient";
import { volumeApi } from "@/lib/query/volume.query";

const HomeVolumes = async () => {
  const store = makeStore();
  const dispatch = store.dispatch as AppDispatch;
  // @ts-ignore
  await dispatch(volumeApi.endpoints.getVolumes.initiate());
  // @ts-ignore
  const { data } = store.getState().volumeApi.queries["getVolumes(undefined)"];

  return <HomeVolumesClient volume={data} />;
};

export const revalidate = 10;

export default HomeVolumes;
