"use client";
import Image from "next/image";
import { CircleAlert, CircleX } from "lucide-react";
import Link from "next/link";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import toast from "react-hot-toast";
import { useRemoveWishlistItemMutation } from "@/redux/features/wishlist/wishlistApi";

const SingleItem = ({ item }: any) => {
  const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
  const [removeWishlistItem, { isLoading: removingLoading }] =
    useRemoveWishlistItemMutation();
  const busy = addToCartLoading || removingLoading;
  const { product } = item;
  const handleAddToCart = async (id: string) => {
    try {
      const result = await addToCart({ productId: id, quantity: 1 }).unwrap();
      if (result?.success) toast.success(result?.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add to Cart");
    }
  };
  const handleRemove = async () => {
    if (busy) return;
    try {
      const result = await removeWishlistItem({
        productId: product?._id,
        variantId: item.variantId ?? null,
      }).unwrap();
      if (result?.success) toast.success(result?.message);
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to remove item");
    }
  };
  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[83px]">
        <button
          onClick={handleRemove}
          aria-label="button for remove product from wishlist"
          className=""
        >
          <CircleX
            size={30}
            strokeWidth={1}
            className="  hover:text-red dark:hover:text-red transition-all duration-200"
          />
        </button>
      </div>

      <div className="min-w-[387px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center bg-gray-6 p-4 max-w-[100px] w-full h-[100px] rounded-full ">
              <Image
                src={product.images[0].url}
                alt={product.name}
                width={200}
                height={200}
                className=""
              />
            </div>

            <Link href={`/product/${product._id}`}>
              <h3 className=" ease-out duration-200 hover:text-pink">
                <span> {product.name} </span>
              </h3>
            </Link>
          </div>
        </div>
      </div>

      <div className="min-w-[205px]">
        <p className="">৳ {product.price}</p>
      </div>

      <div className="min-w-[265px]">
        <div className="flex items-center gap-1.5">
          {product.status === "In Stock" ? (
            <p className="text-green">In Stock</p>
          ) : (
            <div className="flex items-center gap-x-3 text-red">
              <CircleAlert size={22} />

              <span>Out Of Stock</span>
            </div>
          )}
        </div>
      </div>

      <div className="min-w-[150px] flex justify-end">
        <button
          disabled={product.status === "In Stock" ? false : true}
          className="disabled:cursor-not-allowed disabled:hover:bg-gray-6 disabled:bg-gray-6 disabled:hover:text-dark inline-flex text-dark hover:text-white bg-gray-1 border border-gray-3 py-2.5 px-6 rounded-md ease-out duration-200 hover:bg-pink hover:border-gray-3"
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
