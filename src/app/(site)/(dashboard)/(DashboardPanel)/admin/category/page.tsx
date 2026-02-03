import React from "react";
import AllCategoryLists from "./_components/AllCategoryLists";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Category | Dashboard",
  description: "This is Dashboard for AK Shop",
};
export default function CategoryPage() {
  return (
    <div>
      <AllCategoryLists />
    </div>
  );
}
