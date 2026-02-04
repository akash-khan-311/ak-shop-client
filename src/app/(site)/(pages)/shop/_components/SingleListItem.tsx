"use client";
import React from "react";

import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { addToWishlist } from "@/redux/features/wishListsSlice";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import AddToCartButton from "./AddToCartButton";

const SingleListItem = ({ item }: any) => {
  const { openModal } = useModalContext();
  const [addToCart] = useAddToCartMutation();
  const dispatch = useAppDispatch();

  // update the QuickView state
  const handleQuickViewUpdate = () => {};

  // add to cart

  const handleItemToWishList = (item: any) => {
    const data = {
      id: item.id,
      title: item.title,
      price: item.discountedPrice,
      image: item.images.thumbnail,
      slug: item.slug,
      inStock: item.stock > 0,
    };

    dispatch(addToWishlist(data));
  };

  const handleAddToCart = async (id: string) => {
    try {
      console.log("this is product id", id);
    } catch (error) {}
  };

  return (
    <div className="group rounded-lg bg-white dark:bg-dark-2 shadow-xl relative">
      <div className="flex">
        <div className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={item?.images[0].url}
              alt={item.productName}
              width={250}
              height={250}
              className="w-full h-full object-contain hover:scale-110 ease-in duration-300"
            />
            <AddToCartButton addToCart={handleAddToCart} product={item} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
          <div>
            <h3 className="font-medium text-2xl text-dark dark:text-white ease-out duration-200 hover:text-pink mb-1.5">
              <Link href={`/shop-details/${item._id}`}>{item.productName}</Link>
            </h3>
            <p>{item.description}</p>
            <span className="flex items-center gap-2 font-medium text-lg">
              <span className="text-dark dark:text-gray-3">৳ {item.price}</span>
              <span className="text-dark-4 line-through dark:text-gray-6">
                ৳ {item.regularPrice}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 mb-2">
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${i < item.rating ? "fill-yellow-400 text-yellow" : "text-gray-6"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-5">({0})</span>
            </div>
          </div>
        </div>
      </div>
      {/* Hover Action Buttons */}
      <div className="absolute right-5 top-3 flex flex-col gap-2 transform   transition-all duration-300">
        <button
          onClick={() => handleItemToWishList(item)}
          className="w-8 h-8 sm:w-9 sm:h-9 bg-white dark:bg-dark rounded-full shadow-md flex items-center justify-center  text-pink hover:shadow-lg transition-all duration-200"
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default SingleListItem;
