"use client";
import Logout from "@/components/ui/Auth/Logout";
import { getToken } from "@/lib/auth/getToken";
import { formatMonthYear, verifyToken } from "@/utils";
import {
  CalendarArrowUp,
  Camera,
  Heart,
  LayoutDashboard,
  MapPin,
  TicketCheck,
  Trash,
  User,
} from "lucide-react";
import Image from "next/image";
import {
  adminMenuItems,
  superAdminMenuItems,
  userMenuItems,
  vendorMenuItems,
} from "./constant/SidebarMenus";
import MenuItem from "./MenuItem/MenuItem";
import { TUser } from "@/types";

import UploadProfileImage from "./UploadProfileImage";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";

function Sidebar() {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetMeQuery(null);
  const user = data?.data;

  console.log("this is user from sidebar", token);
  const joinedDate = formatMonthYear(user?.createdAt);
  console.log("this is user from sidebar", user);
  let menu = [];
  if (user?.role === "user") menu = userMenuItems;
  if (user?.role === "vendor") menu = vendorMenuItems;
  if (user?.role === "superAdmin") menu = superAdminMenuItems;
  if (user?.role === "admin") menu = adminMenuItems;

  useEffect(() => {
    if (user === undefined) {
      dispatch(logout());
    }
  }, [user, token, dispatch]);

  return (
    <div className="xl:max-w-[457px] w-full">
      <div className="relative z-1 rounded-[10px] bg-white border border-gray-6 dark:border-white overflow-hidden dark:bg-dark-2">
        <div className="flex flex-col justify-center items-center p-4">
          <div className=" rounded-full   relative">
            <Image
              className=" shadow-lg dark:shadow-white/10 rounded-full w-40 h-40 object-cover"
              src={user?.avatar || "/demo_male.png"}
              width={500}
              height={500}
              alt="sidebar image"
            />
            <div className=" absolute rounded-full flex justify-center  items-center p-2 bg-white hover:bg-gray-3 dark:hover:bg-gray-7 dark:bg-gray-6  z-999999 right-5 bottom-0">
              <UploadProfileImage user={user} />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2 className="font-semibold text-dark dark:text-white text-xl mt-4">
              {user?.name}
            </h2>

            <p className="font-medium text-dark-4 text-custom-sm mb-1.5 dark:text-gray-5">
              {joinedDate}
            </p>
          </div>
        </div>
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <MenuItem
              key={item.name}
              path={item.href}
              label={item.name}
              icon={<Icon size={20} />}
            />
          );
        })}
        <Logout className="gap-x-4 w-full flex items-center px-4 py-4 my-1 transition-colors duration-300 transform  hover:backdrop-blur-sm dark:hover:bg-white/10 hover:bg-dark/10 hover:text-gray-100" />
      </div>
    </div>
  );
}

export default Sidebar;
