import React, { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

const SingleItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item.id));
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity - 1 }));
    } else {
      return;
    }
  };

  return (
    <div className="flex items-center border-t border-gray-3 dark:border-gray-6 py-5 px-7.5">
      <div className="min-w-[400px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 dark:bg-dark-3 max-w-[80px] w-full h-17.5">
              <Image
                width={200}
                height={200}
                src={item.imgs?.thumbnails[0]}
                alt="product"
              />
            </div>

            <div>
              <h3 className=" ease-out duration-200 hover:text-pink">
                <a href={`/shop-details/${item.id}`}> {item.title} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[180px]">
        <p className="">${item.discountedPrice}</p>
      </div>

      <div className="min-w-[275px]">
        <div className="w-max flex items-center rounded-md border border-gray-3">
          <button
            onClick={() => handleDecreaseQuantity()}
            aria-label="button for remove product"
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-pink"
          >
            <Minus size={20} />
          </button>

          <span className="flex items-center justify-center w-16 h-11.5 border-x border-gray-4">
            {quantity}
          </span>

          <button
            onClick={() => handleIncreaseQuantity()}
            aria-label="button for add product"
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-pink"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="min-w-[200px]">
        <p className="">${item.discountedPrice * quantity}</p>
      </div>

      <div className="min-w-[50px] flex justify-end">
        <button
          onClick={() => handleRemoveFromCart()}
          aria-label="button for remove product from cart"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 dark:bg-dark border border-gray-3  ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
