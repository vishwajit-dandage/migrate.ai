"use client";
import { useCloudProviderStore } from "@/store/app";
import React from "react";

const ProviderData = () => {
  const selectedProvider = useCloudProviderStore((state) => state.provider);

  return (
    <div className="border-[1px] border-black ">
      <div className=" text-center uppercase">
        {selectedProvider} <span className=" capitalize">Cloud</span>
      </div>
    </div>
  );
};

export default ProviderData;
