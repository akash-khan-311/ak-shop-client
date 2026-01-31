import { Metadata } from "next";
import React from "react";
import AllCategoryLists from "../../_admin/category/_components/AllCategoryLists";
import AllOrderList from "./_components/orders-table/AllOrderList";
export const metadata: Metadata = {
  title: "Orders | AK Shop E-Commerce Solutions",
  description: "This is Dashboard for AK Shop",
};

export default function OrdersPage() {
  return (
    <>
      <AllOrderList />
    </>
  );
}
