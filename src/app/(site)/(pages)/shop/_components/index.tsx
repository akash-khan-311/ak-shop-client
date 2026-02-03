"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../../../../../components/Common/Breadcrumb";
import CustomSelect from "./CustomSelect";

import PriceDropdown from "./PriceDropdown";
import SingleGridItem from "./SingleGridItem";
import SingleListItem from "./SingleListItem";
import { LayoutGrid, PanelLeftOpen, StretchHorizontal } from "lucide-react";
import { useGetAllCategoriesForUserQuery } from "@/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import Container from "../../../../../components/ui/Container";
import ProductCategories from "@/app/(site)/(pages)/shop/_components/ProductCategories";
import ProductBrands from "./ProductBrands";

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const { data, isLoading } = useGetAllCategoriesForUserQuery(undefined);
  const { data: ProductData, isLoading: loading } =
    useGetAllProductsQuery(undefined);
  const [stickyMenu, setStickyMenu] = useState(false);

  const categories = data?.data || [];
  const products = ProductData?.data || [];

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  const options = [
    { label: "All Products", value: "all" },
    { label: "Latest Products", value: "0" },
    { label: "Best Selling", value: "1" },
    { label: "Old Products", value: "2" },
  ];

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);

    // closing sidebar while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".sidebar-content")) {
        setProductSidebar(false);
      }
    }

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <Breadcrumb
        title={"Explore All Products"}
        pages={["shop", "/", "shop with sidebar"]}
      />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 dark:bg-dark bg-[#f3f4f6]">
        <Container>
          <div className="flex gap-7.5">
            {/* <!-- Sidebar Start --> */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? "translate-x-0 dark:bg-dark bg-white p-5 h-screen overflow-y-auto"
                  : "-translate-x-full"
              }`}
            >
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="button for product sidebar toggle"
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center justify-center w-8 h-8 rounded-md dark:bg-dark-2 bg-white shadow-1 ${
                  stickyMenu
                    ? "lg:top-20 sm:top-34.5 top-35"
                    : "lg:top-24 sm:top-39 top-37"
                }`}
              >
                <PanelLeftOpen size={20} className="" />
              </button>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-6">
                  {/* <!-- filter box --> */}
                  <div className="bg-white dark:bg-dark-2 shadow-1 dark:shadow-dark-2 rounded-lg py-4 px-5">
                    <div className="flex items-center justify-between">
                      <p>Filters:</p>
                      <button className="text-pink">Clean All</button>
                    </div>
                  </div>

                  {/* <!-- category box --> */}

                  <ProductCategories categories={categories} />
                  {/* <!-- Product Brands Box --> */}
                  <ProductBrands />
                  {/* // <!-- price range box --> */}
                  <PriceDropdown />
                </div>
              </form>
            </div>
            {/* // <!-- Sidebar End --> */}

            {/* // <!-- Content Start --> */}
            <div className=" w-full">
              <div className="rounded-lg bg-white dark:bg-dark-2 shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  {/* <!-- top bar left --> */}
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomSelect options={options} />

                    <p className="dark:text-white">
                      Showing <span className="">9 of 50</span> Products
                    </p>
                  </div>

                  {/* <!-- top bar right --> */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle("grid")}
                      aria-label="button for product grid tab"
                      className={`${
                        productStyle === "grid"
                          ? "bg-pink border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-pink hover:border-pink hover:text-white`}
                    >
                      <LayoutGrid size={20} />
                    </button>

                    <button
                      onClick={() => setProductStyle("list")}
                      aria-label="button for product list tab"
                      className={`${
                        productStyle === "list"
                          ? "bg-pink border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-pink hover:border-pink hover:text-white`}
                    >
                      <StretchHorizontal size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* <!-- Products Grid Tab Content Start --> */}
              <div
                className={`${
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }`}
              >
                {products.map((item, key) =>
                  productStyle === "grid" ? (
                    <SingleGridItem item={item} key={key} />
                  ) : (
                    <SingleListItem item={item} key={key} />
                  ),
                )}
              </div>
              {/* <!-- Products Grid Tab Content End --> */}
            </div>
            {/* // <!-- Content End --> */}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ShopWithSidebar;
