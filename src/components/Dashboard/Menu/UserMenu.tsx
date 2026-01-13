import {
  CalendarArrowUp,
  Heart,
  LayoutDashboard,
  Lock,
  MapPin,
  Star,
  TicketCheck,
  Trash,
  User,
} from "lucide-react";
import React from "react";
import MenuItem from "../MenuItem/MenuItem";
const userMenuItems = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "My Orders",
    href: "/user/orders",
    icon: <CalendarArrowUp size={20} />,
  },
  {
    name: "Wishlist",
    href: "/user/wishlist",
    icon: <Heart size={20} />,
  },
  {
    name: "My Reviews",
    href: "/user/reviews",
    icon: <Star size={20} />,
  },
  {
    name: "Address Book",
    href: "/user/address",
    icon: <MapPin size={20} />,
  },
  {
    name: "Support Tickets",
    href: "/user/tickets",
    icon: <TicketCheck size={20} />,
  },
  {
    name: "Profile Settings",
    href: "/user/profile",
    icon: <User size={20} />,
  },
  {
    name: "Change Password",
    href: "/user/change-password",
    icon: <Lock size={20} />,
  },
  {
    name: "Delete Account",
    href: "/user/delete-account",
    icon: <Trash size={20} />,
  },
];
export default function UserMenu() {
  return (
    <>
      {userMenuItems.map((item) => {
        const { name, href, icon } = item;

        return (
          <MenuItem key={item.name} label={name} path={href} icon={icon} />
        );
      })}
    </>
  );
}
