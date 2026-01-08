import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Login = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="bg-white dark:bg-dark-2 shadow-1 rounded-[10px]">
      <div
        onClick={() => setDropdown(!dropdown)}
        className={`cursor-pointer flex items-center gap-0.5 py-5 px-5.5 ${
          dropdown && "border-b border-gray-3"
        }`}
      >
        Returning customer?
        <span className="flex items-center gap-2.5 pl-1 font-medium text-dark dark:text-gray-5">
          Click here to login
          <ChevronDown
            className={`${dropdown && "rotate-180"} transition-all duration-200`}
          />
        </span>
      </div>

      {/* <!-- dropdown menu --> */}
      <div
        className={`${
          dropdown ? "block" : "hidden"
        } pt-7.5 pb-8.5 px-4 sm:px-8.5`}
      >
        <p className="text-custom-sm mb-6">
          If you didn&apos;t Logged in, Please Log in first.
        </p>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2.5">
            Username or Email
          </label>

          <input
            type="text"
            name="name"
            id="name"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 dark:bg-dark-4 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-pink"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2.5">
            Password
          </label>

          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 dark:bg-dark-4 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-pink"
          />
        </div>

        <button
          type="submit"
          className="inline-flex font-medium text-white bg-pink py-3 px-10.5 rounded-md ease-out duration-200 hover:bg-pink-dark"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
