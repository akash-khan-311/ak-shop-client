import {
  CalendarArrowUp,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  TicketCheck,
  Trash,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { name: "Profile", href: "/user/profile", icon: <User size={20} /> },
  {
    name: "Support Ticket",
    href: "/user/ticket",
    icon: <TicketCheck size={20} />,
  },
  { name: "Orders", href: "/user/orders", icon: <CalendarArrowUp size={20} /> },
  { name: "Address", href: "/user/address", icon: <MapPin size={20} /> },
  { name: "Wishlist", href: "/user/wishlist", icon: <Heart size={20} /> },
  {
    name: "Delete Account",
    href: "/user/delete-account",
    icon: <Trash size={20} />,
  },
  { name: "Logout", href: "/user/logout", icon: <LogOut size={20} /> },
];

function Sidebar() {
  return (
    <div className="xl:max-w-[457px] w-full">
      <div className="relative z-1 rounded-[10px] bg-white border border-gray-6 dark:border-white overflow-hidden dark:bg-dark-2">
        <div className="flex flex-col justify-center items-center p-4">
          <div className="w-40 h-40 rounded-full shadow-lg dark:shadow-white/10 overflow-hidden">
            <Image
              className="rounded-full w-40 h-40 object-cover"
              src={
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fm=jpg"
              }
              width={200}
              height={200}
              alt="sidebar image"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-semibold text-dark dark:text-white text-xl mt-4">
              John Doe
            </h2>

            <p className="font-medium text-dark-4 text-custom-sm mb-1.5 dark:text-gray-5">
              Joined Dec 2025
            </p>
          </div>
        </div>
        <ul>
          {/* <!-- sidebar links --> */}
          {sidebarLinks.map((link, index) => {
            const { name, href, icon: Icon } = link;
            return (
              <li
                key={index}
                className="border-b border-t dark:border-white/10 transition-all duration-200 hover:bg-pink/10 dark:hover:bg-white/10"
              >
                <Link
                  href={href}
                  className="flex items-center gap-3 p-4 text-dark dark:text-white"
                >
                  {Icon} <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
