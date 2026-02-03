import React from "react";
import AddCouponForm from "./_components/AddCoupon";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Coupons | Dashboard",
  description: "This is Dashboard for AK Shop",
};
export default function AddCouponPage() {
  return (
    <div>
      <AddCouponForm />
    </div>
  );
}
