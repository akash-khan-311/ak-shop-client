import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
interface MenuItemProps {
  label: string;
  path: string;
  icon: ReactNode;
}
const UserMenuItems = ({ label, path, icon: Icon }: MenuItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === path;
  return (
    <Link
      href={path}
      className={`flex items-center px-4 py-2 my-4  transition-colors duration-300 transform  hover:backdrop-blur-sm dark:hover:bg-white/10 hover:bg-gray-6/30  ${
        isActive
          ? "backdrop-blur-sm dark:bg-white/10 bg-gray-6/30 text-gray-100"
          : "text-gray-100"
      }`}
    >
      <span>{Icon}</span>

      <span className="mx-4 font-medium">{label}</span>
    </Link>
  );
};

export default UserMenuItems;
