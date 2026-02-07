import React from "react";

export default function OrderBox({ products }: any) {
  console.log("this is order product", products);
  return (
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
        {products?.map((product: any) => {
          const p = product.product;

          return (
            <div
              key={p._id}
              className="flex items-center justify-between py-5 border-b border-gray-3"
            >
              <div>
                <p className="">{p?.name}</p>
              </div>
              <div>
                <p className=" text-right">৳ {p?.price}</p>
              </div>
            </div>
          );
        })}

        {/* <!-- product item --> */}

        {/* <!-- total --> */}
        <div className="flex items-center justify-between pt-5">
          <div>
            <p className="font-medium text-lg ">Total</p>
          </div>
          <div>
            <p className="font-medium text-lg  text-right">$1072.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
