"use client";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Women's Bag",
    count: 15,
    subcategories: ["Handbag", "Shoulder Bag", "Backpack", "Clutch"],
  },
  {
    id: 2,
    name: "Men's Accessories",
    count: 20,
    subcategories: ["Watches", "Belts", "Wallets", "Sunglasses"],
  },
  {
    id: 3,
    name: "School Bag",
    count: 33,
    subcategories: ["Kids Bag", "College Bag", "Laptop Bag"],
  },
  {
    id: 4,
    name: "Boots",
    count: 40,
    subcategories: ["Ankle Boots", "Knee High", "Rain Boots"],
  },
  {
    id: 5,
    name: "Boy's Dress",
    count: 44,
    subcategories: ["T-Shirts", "Pants", "Shorts", "Jackets"],
  },
  {
    id: 6,
    name: "Women's Fashion",
    count: 50,
    subcategories: ["Dresses", "Tops", "Skirts", "Jeans"],
  },
  {
    id: 7,
    name: "Fashion Accessories",
    count: 33,
    subcategories: ["Jewelry", "Scarves", "Hats", "Gloves"],
  },
  {
    id: 8,
    name: "Leather Bags",
    count: 31,
    subcategories: ["Genuine Leather", "PU Leather", "Vegan Leather"],
  },
  {
    id: 9,
    name: "Makeup Corner",
    count: 25,
    subcategories: ["Face", "Eyes", "Lips", "Tools"],
  },
];

export default function ProductCategories() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleCategory = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
        Product Categories
      </h2>

      <div className="space-y-1">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border-b border-gray-50 last:border-0"
          >
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between py-2.5 px-1 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
            >
              <div className="flex items-center gap-2">
                {expandedId === category.id ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                )}
                <span
                  className={`text-sm sm:text-base ${expandedId === category.id ? "text-blue-600 font-medium" : "text-gray-700"}`}
                >
                  {category.name}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 font-medium">
                {category.count}
              </span>
            </button>

            {/* Smooth Expandable Subcategories */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedId === category.id
                  ? "max-h-48 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-8 pr-4 pb-2 space-y-1.5">
                {category.subcategories.map((sub, index) => (
                  <button
                    key={index}
                    className="block w-full text-left text-xs sm:text-sm text-gray-500 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 py-1"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
