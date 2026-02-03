import React from "react";
import AllUserList from "./_components/AllUserList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | Dashboard",
  description: "This is Dashboard for AK Shop",
};
export default function UserPage() {
  return (
    <div>
      <AllUserList />
    </div>
  );
}
