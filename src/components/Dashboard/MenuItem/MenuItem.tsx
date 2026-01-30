"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubItem {
  name: string;
  path: string;
}

interface MenuItemProps {
  label: string;
  path?: string;
  isExpanded?: boolean;
  isHovered?: boolean;
  isMobileOpen?: boolean;
  icon: ReactNode;
  subItems?: SubItem[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function MenuItem({
  label,
  path,
  icon,
  subItems,
  isOpen = false,
  isExpanded,
  isHovered,
  isMobileOpen,
  onToggle,
}: MenuItemProps) {
  const pathname = usePathname();

  const isActive =
    path === pathname || subItems?.some((item) => item.path === pathname);

  if (subItems?.length) {
    return (
      <motion.div layout>
        <button
          type="button"
          onClick={onToggle}
          className={`w-full rounded-md flex items-center justify-between px-4 py-4 my-1
            transition-colors duration-300
            hover:backdrop-blur-sm hover:bg-dark/10 dark:hover:bg-white/10
            ${isActive ? "bg-dark/10 dark:bg-white/10 text-gray-1" : ""}`}
        >
          <div className="flex items-center gap-4">
            {icon}
            <span className="font-medium ">{label}</span>
          </div>

          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* SUB MENU */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="ml-10 mt-2 flex flex-col gap-2 overflow-hidden"
            >
              {subItems.map((sub) => {
                const active = pathname === sub.path;

                return (
                  <Link
                    key={sub.name}
                    href={sub.path}
                    className={`text-sm px-3 py-2 rounded-md transition-colors duration-300 hover:bg-dark/10 dark:hover:bg-white/10
                      ${
                        active
                          ? "bg-dark/10 dark:bg-white/10 text-gray-100"
                          : "text-gray-400 "
                      }`}
                  >
                    {sub.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  /* =========================
     CASE 2: NORMAL MENU ITEM
  ========================== */
  return (
    <motion.div layout>
      <Link
        href={path!}
        className={`flex items-center gap-4 px-4 py-4 my-1
          hover:backdrop-blur-sm hover:bg-dark/10 dark:hover:bg-white/10 rounded-md
          ${isActive ? "bg-dark/10 dark:bg-white/10 " : ""}`}
      >
        {isExpanded || isHovered || isMobileOpen ? (
          <>
            {icon}
            <span className="font-medium">{label}</span>
          </>
        ) : (
          <span>{icon}</span>
        )}
      </Link>
    </motion.div>
  );
}
