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
import Image from "next/image";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const dropDownItems = [
  { name: "Dashboard", path: "/admin/dashboard", Icon: UserCog },
  { name: "Orders", path: "/admin/orders", Icon: ShoppingBag },
  { name: "Tickets", path: "/admin/tickets", Icon: Tickets },
  { name: "Profile", path: "/admin/profile", Icon: UserPen },
];

export default function AdminDropDown({ setIsOpen, isOpen }) {
  const token = useAppSelector(selectCurrentToken);

  const { data, isLoading, error } = useGetMeQuery(token);
  const me = data?.data;

  console.log(me);

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="relative cursor-pointer">
      <div>
        <Image
          height={100}
          width={100}
          className="w-10 h-10 rounded-full"
          src={me?.avatar?.url || "/demo_male.png"}
          alt={me?.name}
        />
      </div>
      <div
        className={`absolute overflow-hidden top-10 transition-[opacity,margin] duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 invisible"}   min-w-60 backdrop-blur-md bg-white/10 shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700`}
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
  );
}
