import React from "react";
import { Connect } from "./Connect";
import ProviderData from "./ProviderData";
import DropDownComp from "./DropDownComp";

const Layout = () => {
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
        <ProviderData />
      </div>
      <div className=" shadow-sm h-[400px] w-[50%] border-2 border-lime-100"></div>
    </div>
  );
};

export default Layout;
