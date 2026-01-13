"use client";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";

import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/features/wishListsSlice";

const ProductItem = ({ item }: any) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch();
  console.log(item);

  // update the QuickView state
  const handleQuickViewUpdate = () => {};

  // add to cart
  const handleAddToCart = () => {};

  const handleItemToWishList = (item: any) => {
    const data = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.images.thumbnail,
      slug: item.slug,
      inStock: item.stock > 0,
    };

    dispatch(addToWishlist(data));
  };

  const handleProductDetails = () => {};

  const fillColorArray = [
    "#f17a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045",
  ];

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg dark:bg-dark bg-[#F6F7FB] min-h-[270px] mb-4">
        <Image
          src={item?.images?.thumbnail || "/demo_male.png"}
          alt=""
          width={200}
          height={200}
        />

        <div className="absolute left-0 -bottom-1 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
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

      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center gap-1">
          <Rating
            initialValue={0}
            fillColorArray={fillColorArray}
            size={20}
            iconsCount={1}
            readonly
          />
          <Rating
            initialValue={5}
            fillColorArray={fillColorArray}
            size={20}
            iconsCount={1}
            readonly
          />
          <Rating
            initialValue={5}
            fillColorArray={fillColorArray}
            size={20}
            iconsCount={1}
            readonly
          />
          <Rating
            initialValue={5}
            fillColorArray={fillColorArray}
            size={20}
            iconsCount={1}
            readonly
          />
          <Rating
            initialValue={5}
            fillColorArray={fillColorArray}
            size={20}
            iconsCount={1}
            readonly
          />
        </div>

        <p className="text-custom-sm">({item.reviews})</p>
      </div>

      <h3
        className="font-medium text-dark dark:text-gray-3 ease-out duration-200 hover:text-pink mb-1.5"
        onClick={() => handleProductDetails()}
      >
        <Link href={`/product/${item.id}`}> {item.title} </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark dark:text-gray-5">
          ৳{item.discountPrice}
        </span>
        <span className="text-dark-4 line-through dark:text-gray-6">
          ৳{item.price}
        </span>
      </span>
    </div>
  );
};

export default ProductItem;
