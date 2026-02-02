"use client";
import {
  Heart,
  ArrowLeftRight,
  RefreshCw,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative  aspect-[4/4] overflow-hidden p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover object-center  duration-500 p-6"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover Action Buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-red-500 hover:shadow-lg transition-all duration-200">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-lg transition-all duration-200">
            <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-green-600 hover:shadow-lg transition-all duration-200">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Discount Badge (if applicable) */}
        {product.oldPrice && (
          <div className="absolute left-3 top-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -
            {Math.round(
              ((product.oldPrice - product.newPrice) / product.oldPrice) * 100,
            )}
            %
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1.5 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          {product.oldPrice && (
            <span className="text-gray-400 text-xs sm:text-sm line-through">
              ${product.oldPrice}
            </span>
          )}
          <span className="text-gray-900 font-bold text-sm sm:text-base">
            ${product.newPrice}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full border border-gray-200 text-gray-700 py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 flex items-center justify-center gap-2">
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
