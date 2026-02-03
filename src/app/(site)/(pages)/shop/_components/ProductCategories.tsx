"use client";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useGetAllCategoriesForUserQuery } from "@/redux/features/category/categoryApi";
import { TSubCategory } from "@/types/category";

export default function ProductCategories({ categories }) {
  const [expandedId, setExpandedId] = useState(null);
  const toggleCategory = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-dark-2 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
        Product Categories
      </h2>

      <div className="space-y-1">
        {categories.map((category) => (
          <div
            key={category._id}
            className="border-b border-gray-50 last:border-0"
          >
            <button
              onClick={() => toggleCategory(category._id)}
              className="w-full flex items-center justify-between py-2.5 px-1 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
            >
              <div className="flex items-center gap-2">
                {expandedId === category.id ? (
                  <ChevronDown className="w-4 h-4 text-gray-5" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-4 group-hover:text-gray-600" />
                )}
                <span
                  className={`text-sm sm:text-base ${expandedId === category.id ? "text-blue-600 font-medium" : "text-gray-700"}`}
                >
                  {category.name}
                </span>
              </div>
              <span className="text-xs sm:text-sm bg-gray-3 dark:bg-gray-7 px-2 py-0.5 rounded-full font-medium">
                {category.productCount}
              </span>
            </button>

            {/* Smooth Expandable Subcategories */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedId === category._id && category.subcategories.length
                  ? "max-h-48 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {category.subcategories && (
                <div className="pl-8 pr-4 pb-2 space-y-1.5">
                  {category?.subcategories?.map(
                    (sub: TSubCategory, index: any) => (
                      <button
                        key={index}
                        className="block w-full text-left text-xs sm:text-sm text-gray-500 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 py-1"
                      >
                        {sub.name}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
