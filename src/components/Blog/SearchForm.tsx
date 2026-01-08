import { Search } from "lucide-react";
import React from "react";

const SearchForm = () => {
  return (
    <div className="shadow-1 bg-white dark:bg-dark rounded-xl">
      <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
        <h2 className="font-medium text-lg text-dark dark:text-white">
          Search
        </h2>
      </div>

      <div className="p-4 sm:p-6">
        <form>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full rounded-md border dark:bg-dark-4 dark:placeholder:text-white border-gray-3 py-3 pl-5 pr-13 outline-none ease-out duration-200 placeholder:text-dark-5 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-pink/20"
            />
            <button className="text-dark-2 dark:text-white absolute right-0 top-0 px-4 py-3.5 ease-out duration-200 hover:text-pink">
              <Search />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
