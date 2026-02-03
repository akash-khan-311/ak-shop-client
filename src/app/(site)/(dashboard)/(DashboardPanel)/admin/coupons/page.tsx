import React from "react";
import AllCouponLists from "./_components/AllCouponLists";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Coupons | Dashboard",
  description: "This is Dashboard for AK Shop",
};
export default function CouponsPage() {
  return (
    <>
      <AllCouponLists />
    </>
  );
}
