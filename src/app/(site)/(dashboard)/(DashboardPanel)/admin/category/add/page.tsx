import React from "react";
import CreateCategory from "./_components/AddCategory";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add Category | Dashboard",
  description: "This is Dashboard for AK Shop",
};
export default function AddCategoryPage() {
  return (
    <>
      <CreateCategory />
    </>
  );
}
