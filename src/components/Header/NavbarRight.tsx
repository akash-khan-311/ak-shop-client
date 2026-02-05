import { USER_ROLE } from "@/constant";
import { Heart, RefreshCw } from "lucide-react";
import Link from "next/link";

const NavbarRight = ({ wishlists, user }) => {
  return (
    <div className="hidden xl:block">
      <ul className="flex items-center gap-5.5">
        <li className="py-4">
          <Link
            href="#"
            className="flex items-center gap-1.5 font-medium dark:text-white dark:hover:text-pink text-custom-sm text-dark hover:text-pink"
          >
            <RefreshCw size={16} />
            Recently Viewed
          </Link>
        </li>

        <li className="py-4">
          <Link
            href="/wishlist"
            className="flex items-center gap-1.5 font-medium dark:text-white dark:hover:text-pink  text-custom-sm text-dark hover:text-pink"
          >
            <Heart
              size={16}
              className={`${wishlists?.length > 0 && "text-pink fill-pink"}`}
            />
            Wishlist
            {wishlists?.length > 0 && (
              <span className="flex items-center justify-center font-medium text-2xs ml-1 bg-pink w-4.5 h-4.5 rounded-full text-white">
                {wishlists?.length}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarRight;
