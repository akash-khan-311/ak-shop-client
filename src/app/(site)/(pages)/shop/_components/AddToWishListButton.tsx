"use client";

import { Heart } from "lucide-react";
import React from "react";

type Props = {
  product: any;
  isWished: boolean;
  onToggle: (productId: string) => void;
  disabled?: boolean;
};

export default function AddToWishListButton({
  product,
  isWished,
  onToggle,
  disabled,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onToggle(product._id)}
      className="w-8 h-8 sm:w-9 sm:h-9 bg-white dark:bg-dark rounded-full shadow-md flex items-center justify-center text-pink hover:shadow-lg transition-all duration-200 disabled:opacity-60"
      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          isWished ? "fill-pink text-pink" : "text-pink"
        }`}
      />
    </button>
  );
}
