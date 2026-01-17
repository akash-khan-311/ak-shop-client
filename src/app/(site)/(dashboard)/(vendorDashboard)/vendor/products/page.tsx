import { Metadata } from "next";
import AllProductsList from "./_components/AllProductList";
export const metadata: Metadata = {
  title: "Products | AK Shop E-Commerce Solutions",
  description: "This is Dashboard for AK Shop",
};

export default function AllProductsPage() {
  return (
    <div>
      <AllProductsList />
    </div>
  );
}
