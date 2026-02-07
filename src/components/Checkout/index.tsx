"use client";
import React, { useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import Container from "../ui/Container";
import { useGetMyCartQuery } from "@/redux/features/cart/cartApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader/PageLoader";
import OrderBox from "./OrderBox";

const Checkout = () => {
  const router = useRouter();
  const { data, isLoading } = useGetMyCartQuery(undefined);
  const cartItems = data?.data?.items || [];
  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      toast.error("Your cart is empty.");
      router.replace("/cart");
    }
  }, [isLoading, cartItems.length, router]);

  if (isLoading) return <Loader />;
  if (!cartItems.length) return null;
  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2 dark:bg-dark">
        <Container>
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 max-w-[1200px] w-full mx-auto">
              {/* <!-- checkout left --> */}
              <div className="w-full">
                {/* <!-- billing details --> */}
                <Billing />

                {/* <!-- address box two --> */}
                <Shipping />

                {/* <!-- others note box --> */}
                <div className="bg-white dark:bg-dark-2 shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Other Notes (optional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Notes about your order, e.g. speacial notes for delivery."
                      className="rounded-md border border-gray-3 dark:bg-dark-3 dark:placeholder:text-gray-4 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-pink"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <OrderBox products={cartItems} />

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* <!-- shipping box --> */}
                <ShippingMethod />

                {/* <!-- payment box --> */}
                <PaymentMethod />

                {/* <!-- checkout button --> */}
                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-pink py-3 px-6 rounded-md ease-out duration-200 hover:bg-pink-dark mt-7.5"
                >
                  Process to Checkout
                </button>
              </div>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};

export default Checkout;
