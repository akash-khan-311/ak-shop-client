"use client";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }: any) {
  const [addToCart] = useAddToCartMutation();
  const handleAddToCart = async (id: string) => {
    try {
      const result = await addToCart({ productId: id, quantity: 1 }).unwrap();
      console.log("this is result from add to cart", result);
      if (result?.success) toast.success(result?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={() => handleAddToCart(product._id)}
      className="w-full bg-pink text-white py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-pink-dark transition-all duration-300 flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      Add to Cart
    </button>
  );
}
