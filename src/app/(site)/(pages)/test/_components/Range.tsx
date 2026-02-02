"use client";
import { useState } from "react";

export default function PriceRange() {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(300);
  const minLimit = 0;
  const maxLimit = 500;

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 mt-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
        Price Range
      </h2>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Range:</span>
          <span className="font-medium text-gray-900">
            ${minPrice} - ${maxPrice}
          </span>
        </div>

        {/* Custom Range Slider */}
        <div className="relative h-2 bg-gray-200 rounded-full mt-4">
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{
              left: `${(minPrice / maxLimit) * 100}%`,
              right: `${100 - (maxPrice / maxLimit) * 100}%`,
            }}
          />
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={minPrice}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), maxPrice - 10);
              setMinPrice(value);
            }}
            className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
          />
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={maxPrice}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), minPrice + 10);
              setMaxPrice(value);
            }}
            className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
          />

          {/* Visual Thumbs */}
          <div
            className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full border-2 border-white shadow-md top-1/2 -translate-y-1/2 cursor-pointer pointer-events-none transition-transform hover:scale-110"
            style={{ left: `calc(${(minPrice / maxLimit) * 100}% - 8px)` }}
          />
          <div
            className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full border-2 border-white shadow-md top-1/2 -translate-y-1/2 cursor-pointer pointer-events-none transition-transform hover:scale-110"
            style={{ left: `calc(${(maxPrice / maxLimit) * 100}% - 8px)` }}
          />
        </div>

        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>${minLimit}</span>
          <span>${maxLimit}</span>
        </div>
      </div>
    </div>
  );
}
