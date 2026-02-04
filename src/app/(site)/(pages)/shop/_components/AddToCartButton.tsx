import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product, addToCart }: any) {
  return (
    <button
      onClick={() => addToCart(product._id)}
      className="w-full bg-pink text-white py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-pink-dark transition-all duration-300 flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      Add to Cart
    </button>
  );
}
