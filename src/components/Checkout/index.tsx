"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import Container from "../ui/Container";

const Checkout = () => {
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
                <div className="bg-white dark:bg-dark-2 shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl ">Your Order</h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium ">Product</h4>
                      </div>
                      <div>
                        <h4 className="font-medium  text-right">Subtotal</h4>
                      </div>
                    </div>

                    {/* <!-- product item --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="">iPhone 14 Plus , 6/128GB</p>
                      </div>
                      <div>
                        <p className=" text-right">$899.00</p>
                      </div>
                    </div>

                    {/* <!-- product item --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="">Asus RT Dual Band Router</p>
                      </div>
                      <div>
                        <p className=" text-right">$129.00</p>
                      </div>
                    </div>

                    {/* <!-- product item --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="">Havit HV-G69 USB Gamepad</p>
                      </div>
                      <div>
                        <p className=" text-right">$29.00</p>
                      </div>
                    </div>

                    {/* <!-- product item --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="">Shipping Fee</p>
                      </div>
                      <div>
                        <p className=" text-right">$15.00</p>
                      </div>
                    </div>

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg ">Total</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg  text-right">
                          $1072.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

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
