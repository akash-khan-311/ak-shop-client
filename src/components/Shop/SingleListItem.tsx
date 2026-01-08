"use client";
import React from "react";

import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";

const SingleListItem = ({ item }: any) => {
  const { openModal } = useModalContext();

  // update the QuickView state
  const handleQuickViewUpdate = () => {};

  // add to cart
  const handleAddToCart = () => {};

  const handleItemToWishList = () => {};

  return (
    <div className="group rounded-lg bg-white dark:bg-dark-2 shadow-1">
      <div className="flex">
        <div className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4">
          <Image src={item.images.thumbnail} alt="" width={250} height={250} />

          <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
            <button
              onClick={() => {
                openModal();
                handleQuickViewUpdate();
              }}
              aria-label="button for quick view"
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-pink"
            >
              <Eye size={16} />
            </button>

            <button
              onClick={() => handleAddToCart()}
              className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-pink text-white ease-out duration-200 hover:bg-pink-dark"
            >
              Add to cart
            </button>

            <button
              onClick={() => handleItemToWishList()}
              aria-label="button for favorite select"
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-pink"
            >
              <Heart size={16} />
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
          <div>
            <h3 className="font-medium text-dark dark:text-white ease-out duration-200 hover:text-pink mb-1.5">
              <Link href="/shop-details"> {item.title} </Link>
            </h3>

            <span className="flex items-center gap-2 font-medium text-lg">
              <span className="text-dark dark:text-gray-3">
                ${item.discountedPrice}
              </span>
              <span className="text-dark-4 line-through dark:text-gray-6">
                ${item.price}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex items-center gap-1">
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={15}
                height={15}
              />
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={15}
                height={15}
              />
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={15}
                height={15}
              />
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={15}
                height={15}
              />
              <Image
                src="/images/icons/icon-star.svg"
                alt="star icon"
                width={15}
                height={15}
              />
            </div>

            <p className="text-custom-sm">({item.reviews})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListItem;
