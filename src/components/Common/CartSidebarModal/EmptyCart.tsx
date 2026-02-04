import React from "react";
import Link from "next/link";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  const { closeCartModal } = useCartModalContext();

  return (
    <div className="text-center">
      <div className="mx-auto ">
        <div className="dark:bg-white bg-dark-4 text-white dark:text-gray-7 rounded-full p-6 flex justify-center items-center w-44 h-44 mx-auto mb-6 shadow-1 ">
          <ShoppingCart size={100} />
        </div>
      </div>

      <p className="pb-6">Your cart is empty!</p>

      <Link
        onClick={() => closeCartModal()}
        href="/shop"
        className="w-full lg:w-10/12 mx-auto flex justify-center font-medium text-white bg-dark dark:bg-dark-2 py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
