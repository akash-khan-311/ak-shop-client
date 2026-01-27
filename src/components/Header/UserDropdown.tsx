"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown/Dropdwon";
import { DropdownItem } from "../ui/Dropdown/DropDownItems";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { ChevronDown, HeartPlus, Settings, UserPen } from "lucide-react";
import Logout from "../ui/Auth/Logout";

export default function UserDropdown() {
  const token = useAppSelector(selectCurrentToken);
  const { data, isLoading, error } = useGetMeQuery(token, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });
  const user = data?.data;
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative ">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-7 dark:text-gray-4 dropdown-toggle"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <Image
            className="w-full h-full object-cover"
            width={44}
            height={44}
            src={user?.avatar || "/demo_male.png"}
            alt="User"
          />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">
          {user?.name}
        </span>

        <ChevronDown
          className={`${isOpen && "rotate-180"} duration-300 transition-all`}
          size={20}
        />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[320px] flex-col rounded-2xl border bg-white dark:bg-dark p-3 shadow-theme-lg dark:border-gray-6"
      >
        <div className="border-b border-gray-3 dark:border-gray-5">
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.name}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-3 dark:border-gray-5">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <UserPen size={20} />
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <Settings size={20} />
              Account settings
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <HeartPlus size={20} />
              Support
            </DropdownItem>
          </li>
        </ul>
        <div className="">
          <Logout className="flex items-center gap-3 px-3 py-2 w-full mt-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300" />
        </div>
      </Dropdown>
    </div>
  );
}
