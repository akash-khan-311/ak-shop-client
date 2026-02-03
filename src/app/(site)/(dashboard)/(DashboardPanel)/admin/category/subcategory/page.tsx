import React from "react";
import AddSubCategoryForm from "./_components/AddSubCategoryForm";
import SubCategoryLists from "./_components/SubCategoryLists";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sub Category | Dashboard",
  description: "This is Dashboard for AK Shop",
};
export default function AddSubCategory() {
  return (
    <div>
      <AddSubCategoryForm />
      <SubCategoryLists />
    </div>
  );
}
