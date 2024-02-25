"use client";
import React from "react";
import { Connect } from "./Connect";
import ProviderData from "./ProviderData";
import DropDownComp from "./DropDownComp";
import DisplayFetchedProvider from "./DisplayFetchedProvider";
import { Button } from "./ui/button";
import Migrate from "./Migrate";
import { useMigrationStatus, useStoreProvider } from "@/store/app";
import TargetDropDown from "./TargetDropDown";
import { ConnectTarget } from "./ConnectTarget";

const Layout = () => {
  const { status } = useMigrationStatus();
  const { providerData } = useStoreProvider();
  return (
    <div className="flex px-5 items-center justify-center gap-5 mt-5">
      <div className=" shadow-sm h-[600px] w-[50%]">
        <div className="flex items-center justify-evenly mt-5">
          <DropDownComp />
        </div>
        <div className="flex items-center justify-between p-3">
          <Connect />
          <div>Select resources to migrate</div>
        </div>
        <div className="border-[1px] border-black h-[300px]">
          {providerData && <ProviderData />}
        </div>
        <Migrate />
      </div>
      <div className=" shadow-sm h-[400px] w-[50%] ">
        <div className="flex items-center justify-evenly mt-5">
          <TargetDropDown />
        </div>
        <div className="flex items-center justify-between p-3">
          <ConnectTarget />
          <div>Select resources to migrate</div>
        </div>
        <div className="flex justify-center items-center font-semibold font-mono text-2xl text-green-500">
          {status && (
            <>
              <div>Migraton Successful </div>
              <div>Please check VM instance in your GCP account"</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
