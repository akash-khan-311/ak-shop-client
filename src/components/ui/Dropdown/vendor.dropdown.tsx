"use client";

import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  Heart,
  LogOut,
  ShoppingBag,
  Tickets,
  UserCog,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Logout from "../Auth/Logout";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const dropDownItems = [
  { name: "Dashboard", path: "/vendor/dashboard", Icon: UserCog },
  { name: "Orders", path: "/vendor/orders", Icon: ShoppingBag },
  { name: "Tickets", path: "/vendor/tickets", Icon: Tickets },
  { name: "Profile", path: "/vendor/profile", Icon: UserPen },
];

export default function VendorDropDown({ setIsOpen, isOpen }) {
  const token = useAppSelector(selectCurrentToken);

  const { data, isLoading, error } = useGetMeQuery(token === null ? "" : token);
  const vendor = data?.data;
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer"
      >
        {vendor?.name}
        <div
          className={`absolute overflow-hidden top-5 transition-[opacity,margin] duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 invisible"}   min-w-60 backdrop-blur-md bg-white/10 shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700`}
        >
          <div className="py-2 first:pt-0 last:pb-0">
            {dropDownItems.map((item, index) => {
              const { name, path, Icon } = item;
              return (
                <Link
                  key={index}
                  className={`flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-100 hover:text-gray-800 hover:bg-gray-4 dark:hover:bg-gray-6`}
                  href={path}
                >
                  <Icon size={18} />
                  <span>{name}</span>
                </Link>
              );
            })}
            <Logout className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-100 hover:text-gray-800 hover:bg-gray-4 dark:hover:bg-gray-6" />
          </div>
        </div>
      </div>
    </>
  );
}
