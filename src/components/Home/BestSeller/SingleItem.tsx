"use client";
import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingCart } from "lucide-react";

const SingleItem = ({ item }: { item: any }) => {
  const { openModal } = useModalContext();

  // update the QuickView state
  const handleQuickViewUpdate = () => {};

  // add to cart
  const handleAddToCart = () => {};

  const handleItemToWishList = () => {};

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-[#F6F7FB] dark:bg-dark min-h-[403px]">
        <div className="text-center px-4 py-7.5">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <div className="flex items-center gap-1">
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={14}
                height={14}
              />
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={14}
                height={14}
              />
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={14}
                height={14}
              />
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={14}
                height={14}
              />
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={14}
                height={14}
              />
            </div>

            <p className="text-custom-sm">({item.reviews || 0})</p>
          </div>

          <h3 className="font-medium text-dark dark:text-white ease-out duration-200 hover:text-pink mb-1.5">
            <Link href="/shop-details"> {item.productName} </Link>
          </h3>

          <span className="flex items-center justify-center gap-2 font-medium text-lg">
            <span className="text-dark dark:text-white">${item.price}</span>
            <span className="text-dark-4 dark:text-gray-5 line-through">
              ${item.regularPrice}
            </span>
          </span>
        </div>

        <div className="flex justify-center items-center">
          <Image
            src={item.images[0].url}
            alt={item.productName}
            width={280}
            height={280}
          />
        </div>

        <div className="absolute right-0 bottom-0 translate-x-full u-w-full flex flex-col gap-2 p-5.5 ease-linear duration-300 group-hover:translate-x-0">
          <button
            onClick={() => {
              handleQuickViewUpdate();
              openModal();
            }}
            aria-label="button for quick view"
            id="bestOne"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-pink"
          >
            <Eye size={15} />
          </button>

          <button
            onClick={() => handleAddToCart()}
            aria-label="button for add to cart"
            id="addCartOne"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-pink"
          >
            <ShoppingCart size={15} />
          </button>

          <button
            onClick={() => {
              handleItemToWishList();
            }}
            aria-label="button for add to fav"
            id="addFavOne"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-pink"
          >
            <Heart size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
