import React from "react";
import AddSpecTemplateForm from "./_components/AddSpecTemplateForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add Specifications | Dashboard",
  description: "This is Dashboard for AK Shop",
};
export default function AddSpecificationsPage() {
  return (
    <>
      <AddSpecTemplateForm />
    </>
  );
}
