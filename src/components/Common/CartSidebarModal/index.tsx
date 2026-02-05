"use client";
import { useEffect } from "react";

import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import SingleItem from "./SingleItem";
import Link from "next/link";
import EmptyCart from "./EmptyCart";
import { CircleX } from "lucide-react";
import { useGetMyCartQuery } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";

const CartSidebarModal = () => {
  const { isCartModalOpen, closeCartModal } = useCartModalContext();
  const token = useAppSelector(selectCurrentToken);
  const { data: cartData, refetch } = useGetMyCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const cart = cartData?.data || null;
  const cartItems = cart?.items;

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeCartModal();
      }
    }

    if (isCartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartModalOpen, closeCartModal]);

  const subtotal =
    cartItems?.reduce((sum, item) => {
      const price = item?.product?.price || 0;
      const qty = item?.quantity || 0;
      return sum + price * qty;
    }, 0) || 0;

  useEffect(() => {
    refetch();
  }, [token, refetch]);
  return (
    <div
      className={`fixed top-0 left-0 z-99999 overflow-y-auto no-scrollbar w-full h-screen bg-dark/70 dark:bg-dark-2/70 ease-linear duration-300 ${
        isCartModalOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-end">
        <div className="w-full max-w-[500px] shadow-1 bg-white dark:bg-dark px-4  relative modal-content">
          <div className="sticky top-0 bg-white dark:bg-dark flex items-center justify-between pb-7 pt-4 sm:pt-7.5 lg:pt-11 border-b border-gray-3 dark:border-gray-6 mb-7.5">
            <h2 className="font-medium  text-lg sm:text-2xl">Cart View</h2>
            <button
              onClick={() => closeCartModal()}
              aria-label="button for close modal"
              className="flex items-center justify-center ease-in duration-150 "
            >
              <CircleX size={40} strokeWidth={1} />
            </button>
          </div>

          <div className="h-[66vh] overflow-y-auto no-scrollbar mt-16">
            <div className="flex flex-col gap-6">
              {/* <!-- cart item --> */}
              {cartItems?.length > 0 ? (
                cartItems.map((item, key) => (
                  <SingleItem key={key} item={item} />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          <div className="border-t border-gray-3 dark:border-gray-6 bg-white dark:bg-dark pt-5 pb-4 sm:pb-7.5 lg:pb-11 mt-7.5 sticky bottom-0">
            <div className="flex items-center justify-between gap-5 mb-6">
              <p className="font-medium text-xl ">Subtotal:</p>

              <p className="font-medium text-xl ">৳ {subtotal}</p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                onClick={() => closeCartModal()}
                href="/cart"
                className="w-full flex justify-center font-medium text-white bg-pink py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-pink-dark"
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                className="w-full flex justify-center font-medium text-white dark:bg-dark-2 bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebarModal;
