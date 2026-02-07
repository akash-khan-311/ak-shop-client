"use client";
import React, { useEffect, useState } from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";

import SingleItem from "./SingleItem";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import {
  useClearCartMutation,
  useGetMyCartQuery,
} from "@/redux/features/cart/cartApi";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { ConfirmationModal } from "../ui/confirmationToast";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";

const Cart = () => {
  const token = useAppSelector(selectCurrentToken);
  const { data: cartData, refetch } = useGetMyCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const [clearCart, { isLoading: clearing }] = useClearCartMutation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const cart = cartData?.data || null;
  const cartItems = cart?.items;
  const openConfirm = () => {
    if (!cartItems?.length) return;
    setIsConfirmOpen(true);
  };
  const handleConfirmClear = async () => {
    try {
      const result = await clearCart({}).unwrap();
      if (result.success) {
        toast.success("Cart cleared successfully");
      }
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to clear cart");
    } finally {
      setIsConfirmOpen(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [token, refetch]);
  return (
    <>
      {/* <!-- ===== Breadcrumb Section Start ===== --> */}
      <section>
        <Breadcrumb title={"Cart"} pages={["Cart"]} />
      </section>
      {/* <!-- ===== Breadcrumb Section End ===== --> */}
      {cartItems?.length > 0 ? (
        <section className="overflow-hidden py-20 bg-gray-2 dark:bg-dark">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <h2 className="font-medium  text-2xl">Your Cart</h2>
              <button onClick={openConfirm} className="text-pink">
                Clear Shopping Cart
              </button>
            </div>

            <div className="bg-white dark:bg-dark-2 rounded-[10px] shadow-1 dark:shadow-dark-2">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  {/* <!-- table header --> */}
                  <div className="flex items-center py-5.5 px-7.5 dark:bg-dark-3">
                    <div className="min-w-[400px]">
                      <p className="font-bold">Product</p>
                    </div>

                    <div className="min-w-[180px]">
                      <p className="font-bold">Price</p>
                    </div>

                    <div className="min-w-[275px]">
                      <p className="font-bold">Quantity</p>
                    </div>

                    <div className="min-w-[200px]">
                      <p className="font-bold">Subtotal</p>
                    </div>

                    <div className="min-w-[50px]">
                      <p className=" text-right font-bold">Action</p>
                    </div>
                  </div>

                  {/* <!-- cart item --> */}
                  {cartItems.length > 0 &&
                    cartItems.map((item, key) => (
                      <SingleItem item={item} key={key} />
                    ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9">
              {/* <Discount /> */}
              {/* <OrderSummary /> */}
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="text-center mt-8 flex flex-col justify-center items-center min-h-[calc(100vh-95px)]">
            <div className="mx-auto pb-7.5">
              <div className="dark:bg-white bg-dark-4 text-white dark:text-gray-7 rounded-full p-6 flex justify-center items-center w-44 h-44 mx-auto mb-6 shadow-1 ">
                <ShoppingCart size={100} />
              </div>
            </div>

            <p className="pb-6">Your cart is empty!</p>

            <Link
              href="/shop"
              className="w-96 mx-auto flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
      {isConfirmOpen && (
        <ConfirmationModal
          isLoading={clearing}
          title={`Are You Sure?`}
          message="This action cannot be undone."
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmClear}
        />
      )}
    </>
  );
};

export default Cart;
