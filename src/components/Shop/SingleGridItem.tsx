"use client";
import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { addToWishlist } from "@/redux/features/wishListsSlice";

const SingleGridItem = ({ item }: any) => {
  const { openModal } = useModalContext();
  const dispatch = useAppDispatch();
  // update the QuickView state
  const handleQuickViewUpdate = () => {};

  // add to cart
  const handleAddToCart = () => {};

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

  return (
    <div className="group bg-white shadow-1 rounded-md dark:bg-dark-2 ">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg shadow-1 min-h-[270px] mb-4">
        <Image
          src={item.images.thumbnail}
          alt={item.title}
          width={250}
          height={250}
        />

        <div className="absolute  left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            id="newOne"
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
            onClick={() => handleItemToWishList(item)}
            aria-label="button for favorite select"
            id="favOne"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-pink"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5  px-4">
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

        <p className=" text-sm">({item.reviews})</p>
      </div>

      <h3 className="font-medium text-dark dark:text-white px-4 ease-out duration-200 hover:text-pink ">
        <Link href="/shop-details"> {item.title} </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg p-4 ">
        <span className="text-dark dark:text-gray-3">
          ${item.discountedPrice}
        </span>
        <span className="text-dark-4 dark:text-gray-6 line-through">
          ${item.price}
        </span>
      </span>
    </div>
  );
};

export default SingleGridItem;
