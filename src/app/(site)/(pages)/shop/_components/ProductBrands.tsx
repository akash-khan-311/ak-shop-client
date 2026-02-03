"use client";
import { useState } from "react";

const brands = [
  { id: 1, name: "Gucci", count: 12 },
  { id: 2, name: "Louis Vuitton", count: 8 },
  { id: 3, name: "Prada", count: 15 },
  { id: 4, name: "Chanel", count: 6 },
  { id: 5, name: "Hermes", count: 9 },
  { id: 6, name: "Zara", count: 24 },
  { id: 7, name: "H&M", count: 18 },
  { id: 8, name: "Nike", count: 32 },
];

export default function ProductBrands() {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggleBrand = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  };

  return (
    <div className=" bg-white dark:bg-dark-2 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 mt-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-2">
        Product Brands
      </h2>

      <div className="space-y-2.5 max-h-64 overflow-y-auto custom-scrollbar">
        {brands.map((brand) => (
          <label
            key={brand.id}
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded-md transition-colors"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.id)}
                onChange={() => toggleBrand(brand.id)}
                className="w-4 h-4 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-0 transition-all cursor-pointer checked:border-blue-600"
              />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span
                className={`text-sm sm:text-base transition-colors ${selectedBrands.includes(brand.id) ? "text-blue-600 font-medium" : "text-gray-700 group-hover:text-gray-900"}`}
              >
                {brand.name}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {brand.count}
              </span>
            </div>
          </label>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
