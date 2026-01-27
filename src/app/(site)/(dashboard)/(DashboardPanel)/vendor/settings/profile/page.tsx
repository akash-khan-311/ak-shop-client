import { Metadata } from "next";
import React from "react";
import Profile from "../../../../_components/Profile/Profile";
export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your account profile details.",
  robots: { index: false, follow: false }, // dashboard pages সাধারণত noindex
};
export default function VendorProfile() {
  return (
    <>
      <Profile />
    </>
  );
}
