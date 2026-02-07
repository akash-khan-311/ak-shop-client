"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useAddToWishlistMutation,
  useGetMyWishlistQuery,
  useRemoveWishlistItemMutation,
} from "@/redux/features/wishlist/wishlistApi";
import { Heart } from "lucide-react";
import React, { useMemo } from "react";
import toast from "react-hot-toast";

type Props = {
  product: any;
  isWished: boolean;
  onToggle: (productId: string) => void;
  disabled?: boolean;
};

export default function AddToWishListButton({ product }) {
  const { data: wishlistData } = useGetMyWishlistQuery(undefined);

  const wishlistItems = useMemo(
    () => wishlistData?.data?.items || [],
    [wishlistData],
  );

  const wishlistIdSet = useMemo(() => {
    return new Set(wishlistItems.map((i: any) => i?.product?._id));
  }, [wishlistItems]);
  const isWished = wishlistIdSet.has(product._id);
  const [addToWishlist, { isLoading: addWishlistLoading }] =
    useAddToWishlistMutation();
  const [removeWish, { isLoading: removingWishlistLoading }] =
    useRemoveWishlistItemMutation();

  const wishlistBusy = addWishlistLoading || removingWishlistLoading;

  // add to cart

  const handleToggleWishlist = async (id: string) => {
    try {
      if (!isWished) {
        const result = await addToWishlist({ productId: id }).unwrap();
        if (result?.success)
          toast.success(result?.message || "Added to wishlist");
      } else {
        const result = await removeWish({ productId: id }).unwrap();
        if (result?.success)
          toast.success(result?.message || "Removed from wishlist");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Wishlist action failed");
    }
  };
  return (
    <TooltipProvider delayDuration={1}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            disabled={wishlistBusy}
            onClick={() => handleToggleWishlist(product._id)}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-white dark:bg-dark rounded-full shadow-xl flex items-center justify-center text-pink hover:shadow-lg transition-all duration-200 disabled:opacity-60"
            aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isWished ? "fill-pink text-pink" : "text-pink"
              }`}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add To Wishlist</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
