import DarazAddProductForm from "@/components/Dashboard/vendor/AddProduct";

import React from "react";
import AddProduct from "./_components/AddProduct";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add Product | AK Shop E-Commerce Solutions",
  description: "This is Dashboard for AK Shop",
};

export default function AddProductPage() {
  return (
    <>
      <AddProduct />
    </>
  );
}
