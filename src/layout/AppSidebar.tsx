"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "lucide-react";

import { useSidebar } from "@/app/context/SidebarContext";
import Logo from "@/components/Logo";
import { vendorMenuItems } from "@/components/Dashboard/constant/SidebarMenus";
import { NavItem } from "@/types";
import MenuItem from "@/components/Dashboard/MenuItem/MenuItem";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const AppSidebar: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log(user);
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others",
  ) => (
    <ul className="flex flex-col gap-4">
      {vendorMenuItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <MenuItem
            key={item.name}
            path={item.href}
            label={item.name}
            icon={<Icon size={20} />}
            subItems={item.subItems}
            isOpen={
              openSubmenu?.type === menuType && openSubmenu.index === index
            }
            onToggle={() => handleSubmenuToggle(index, menuType)}
          />
        );
      })}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 z-10 px-5 left-0 
        bg-white dark:bg-dark 
        h-screen transition-all duration-300 ease-in-out 
        border-r border-gray-6
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LOGO */}
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link className="w-full flex justify-center" href="/">
          <Logo />
        </Link>
      </div>

      {/* MENU */}
      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="mb-6">
          <h2
            className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
              }`}
          >
            {isExpanded || isHovered || (isMobileOpen && "Menu")}
          </h2>

          <ul className="flex flex-col gap-2">
            {user?.role === "vendor" &&
              vendorMenuItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <MenuItem
                    key={item.name}
                    label={item.name}
                    path={item.href}
                    icon={<Icon size={20} />}
                    subItems={item.subItems}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                    isExpanded={isExpanded}
                    isHovered={isHovered}
                    isMobileOpen={isMobileOpen}
                  />
                );
              })}
            {user?.role === "admin" &&
              vendorMenuItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <MenuItem
                    key={item.name}
                    label={item.name}
                    path={item.href}
                    icon={<Icon size={20} />}
                    subItems={item.subItems}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                    isExpanded={isExpanded}
                    isHovered={isHovered}
                    isMobileOpen={isMobileOpen}
                  />
                );
              })}
            {user?.role === "superAdmin" &&
              vendorMenuItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <MenuItem
                    key={item.name}
                    label={item.name}
                    path={item.href}
                    icon={<Icon size={20} />}
                    subItems={item.subItems}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                    isExpanded={isExpanded}
                    isHovered={isHovered}
                    isMobileOpen={isMobileOpen}
                  />
                );
              })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
