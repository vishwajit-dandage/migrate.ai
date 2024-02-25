"use client";
import { useCloudProviderStore } from "@/store/app";
import React from "react";
import DisplayFetchedProvider from "./DisplayFetchedProvider";

const ProviderData = () => {
  const selectedProvider = useCloudProviderStore((state) => state.provider);

  return (
    <>
      <div className=" text-center uppercase font-bold font-mono p-2">
        {selectedProvider} <span className=" capitalize">Cloud</span>
      </div>
      <DisplayFetchedProvider />
    </>
  );
};

export default ProviderData;
