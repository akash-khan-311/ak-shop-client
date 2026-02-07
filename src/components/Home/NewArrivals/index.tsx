"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import shopData from "@/components/Shop/shopData";
import { Handbag } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import Container from "@/components/ui/Container";

const NewArrival = () => {
  const { data } = useGetAllProductsQuery(undefined);
  const products = data?.data || [];
  return (
    <section className="overflow-hidden pt-15 dark:bg-dark-2">
      <Container>
        {/* <!-- section title --> */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark dark:text-gray-5 mb-1.5">
              <Handbag size={20} className="text-pink" />
              This Week’s
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark dark:text-white">
              New Arrivals
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white dark:bg-dark dark:hover:bg-white dark:hover:text-dark dark:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {/* <!-- New Arrivals item --> */}
          {products?.map((product: any) => (
            <ProductItem item={product} key={product._id} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default NewArrival;
