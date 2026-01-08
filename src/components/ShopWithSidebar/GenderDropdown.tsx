"use client";
import { ChevronUp } from "lucide-react";
import React, { useState } from "react";

const GenderItem = ({ category }) => {
  const [selected, setSelected] = useState(false);
  return (
    <button
      className={`${
        selected && "text-pink"
      } group flex items-center justify-between ease-out duration-200 hover:text-pink `}
      onClick={() => setSelected(!selected)}
    >
      <div className="flex items-center gap-2">
        <div
          className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${
            selected
              ? "border-blue bg-pink"
              : "bg-white dark:bg-dark-2 border-gray-3"
          }`}
        >
          <svg
            className={selected ? "block" : "hidden"}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
              stroke="white"
              strokeWidth="1.94437"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span>{category.name}</span>
      </div>

      <span
        className={`${
          selected ? "text-white bg-pink" : "bg-gray-2 dark:bg-dark-4"
        } inline-flex rounded-[30px] text-custom-xs px-2 ease-out duration-200 group-hover:text-white group-hover:bg-pink`}
      >
        {category.products}
      </span>
    </button>
  );
};

const GenderDropdown = ({ genders }) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);

  return (
    <div className="bg-white  dark:bg-dark-2 shadow-1 dark:shadow-dark-2  py-4 px-5 rounded-lg">
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown && "shadow-filter"
        }`}
      >
        <p className="text-dark dark:text-white">Gender</p>
        <button
          onClick={() => setToggleDropdown(!toggleDropdown)}
          aria-label="button for gender dropdown"
          className={`text-dark ease-out duration-200 ${
            toggleDropdown && "rotate-180"
          }`}
        >
          <ChevronUp className="dark:text-white" />
        </button>
      </div>

      {/* <!-- dropdown menu --> */}
      <div
        className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${
          toggleDropdown ? "flex" : "hidden"
        }`}
      >
        {genders.map((gender, key) => (
          <GenderItem key={key} category={gender} />
        ))}
      </div>
    </div>
  );
};

export default GenderDropdown;
