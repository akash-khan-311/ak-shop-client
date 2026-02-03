"use client";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";

import Link from "next/link";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/features/wishListsSlice";

const ProductItem = ({ item }: any) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch();

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
    <div className="bg-white dark:bg-dark-2 rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative overflow-hidden p-4">
        <Image
          src={item.images[0].url}
          alt={item.productName}
          width={300}
          height={300}
          className="object-cover object-center hover:scale-110  duration-500 p-6 mx-auto"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover Action Buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 transform   transition-all duration-300">
          <button
            onClick={() => handleItemToWishList(item)}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-white dark:bg-dark rounded-full shadow-md flex items-center justify-center  text-pink hover:shadow-lg transition-all duration-200"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <Link href={`/product/${item._id}`}>
          <h3 className="text-xl font-medium mb-1.5 line-clamp-1  transition-colors cursor-pointer">
            {item.productName}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-7 dark:text-gray-2 font-semibold text-sm sm:text-base">
            ৳ {item.price}
          </span>
          {item.regularPrice && (
            <span className="text-gray-4 text-xs sm:text-sm line-through">
              ৳ {item.regularPrice}
            </span>
          )}
        </div>

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
          <span className="text-xs text-gray-500">({0})</span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-pink text-white py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-pink-dark transition-all duration-300 flex items-center justify-center gap-2">
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
