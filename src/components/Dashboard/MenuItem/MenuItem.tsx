"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
interface MenuItemProps {
  label: string;
  path: string;
  icon: any;
}
export default function MenuItem({ label, path, icon }: MenuItemProps) {
  const pathname = usePathname();

  const isActive = pathname === path;
  return (
    <Link
      href={path}
      className={`flex items-center px-4 py-4 my-1 transition-colors duration-300 transform  hover:backdrop-blur-sm dark:hover:bg-white/10 hover:bg-dark/10 hover:text-gray-100 ${
        isActive
          ? "backdrop-blur-sm dark:bg-white/10 bg-dark/10 text-gray-100"
          : "text-gray-100"
      }`}
    >
      {icon}

      <span className="mx-4 font-medium">{label}</span>
    </Link>
  );
}
