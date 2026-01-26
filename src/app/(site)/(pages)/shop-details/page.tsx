import React from "react";
// import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
  // other metadata
};

const ShopDetailsPage = () => {
  return (
    <main>
      {/* <ShopDetails /> */}
      <h1>Shop Details</h1>
    </main>
  );
};

export default ShopDetailsPage;
