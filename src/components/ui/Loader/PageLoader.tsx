"use client";
import { ScaleLoader } from "react-spinners";
import React from "react";

const Loader = ({ smallHeight }: any) => {
  return (
    <div
      className={` ${smallHeight ? "h-62.5" : "min-h-[calc(100vh-84px)]"}
      flex 
      flex-col 
      justify-center 
      items-center w-full`}
    >
      <ScaleLoader />
    </div>
  );
};

export default Loader;
