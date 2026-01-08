import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AK Shop | E-Commerce Solutions",
  description: "This is Home for NextCommerce Template",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
