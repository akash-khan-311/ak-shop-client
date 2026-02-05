"use client";

import { clearWishlist } from "@/redux/features/wishListsSlice";
import Breadcrumb from "../Common/Breadcrumb";

import SingleItem from "./SingleItem";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useGetMyWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import toast from "react-hot-toast";

export const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { data: wishListData } = useGetMyWishlistQuery(undefined);
  const wishlist = wishListData?.data || null;
  const wishlistItems = wishlist?.items;

  const handleClearWishList = () => {
    dispatch(clearWishlist());
  };

  return (
    <>
      <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
      <section className="overflow-hidden py-20 bg-gray-2 dark:bg-dark">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark dark:text-white text-2xl">
              Your Wishlist
            </h2>
            <button onClick={handleClearWishList} className="text-pink">
              Clear Wishlist Cart
            </button>
          </div>

          <div className="bg-white dark:bg-dark-2 rounded-[10px] shadow-1 dark:shadow-xl">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center py-5.5 px-10 border-b">
                  <div className="min-w-[83px]"></div>
                  <div className="min-w-[387px]">
                    <p className="text-dark dark:text-white">Product</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark dark:text-white">Unit Price</p>
                  </div>

                  <div className="min-w-[265px]">
                    <p className="text-dark dark:text-white">Stock Status</p>
                  </div>

                  <div className="min-w-[150px]">
                    <p className="text-dark dark:text-white text-right">
                      Action
                    </p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {wishlistItems?.length > 0 ? (
                  wishlistItems?.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))
                ) : (
                  <div className="flex items-center justify-center py-10">
                    <p className="text-dark dark:text-white">
                      Your wishlist is empty
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
