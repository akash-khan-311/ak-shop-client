import React from "react";
import AllSpecificationsList from "./_components/AllSpecificationsList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Specifications | Dashboard",
  description: "This is Dashboard for AK Shop",
};
export default function SpecificationsList() {
  return (
    <>
      <AllSpecificationsList />
    </>
  );
}
