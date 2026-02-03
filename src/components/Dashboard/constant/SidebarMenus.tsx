import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Heart,
  MapPin,
  TicketCheck,
  CreditCard,
  Users,
  Star,
  Settings,
  TicketPercent,
  Store,
  Box,
  Ticket,
  ListChecks,
  Blocks,
} from "lucide-react";

export const userMenuItems = [
  { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/user/profile", icon: User },
  { name: "My Orders", href: "/user/orders", icon: ShoppingBag },
  { name: "Wishlist", href: "/user/wishlist", icon: Heart },
  { name: "Saved Address", href: "/user/address", icon: MapPin },
  { name: "Payments", href: "/user/payments", icon: CreditCard },
  { name: "Support Ticket", href: "/user/ticket", icon: TicketCheck },
];

export const adminMenusItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  /* ---------------- USERS ---------------- */
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },

  {
    name: "Products",
    icon: Box,
    subItems: [
      { name: "All Products", path: "/admin/products" },
      { name: "Add Product", path: "/admin/products/add" },
    ],
  },

  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  /* ---------------- CATEGORY ---------------- */

  {
    name: "Category",
    icon: ListChecks,
    subItems: [
      { name: "All Category", path: "/admin/category" },
      { name: "Add Category", path: "/admin/category/add" },
      { name: "Sub Category", path: "/admin/category/subcategory" },
    ],
  },

  /* ---------------- SPECIFICATIONS ---------------- */
  {
    name: "Specifications",
    icon: Blocks,
    subItems: [
      { name: "All Specifications", path: "/admin/specifications" },
      { name: "Add Specification", path: "/admin/specifications/add" },
    ],
  },

  {
    name: "Tickets",
    href: "/admin/tickets",
    icon: Ticket,
  },

  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },

  {
    name: "Coupons",
    icon: TicketPercent,
    subItems: [
      { name: "All Coupons List", path: "/admin/coupons" },
      { name: "Create Coupons", path: "/admin/coupons/add" },
    ],
  },

  {
    name: "Store Settings",
    href: "/admin/store",
    icon: Store,
  },
  {
    name: "Settings",
    icon: Settings,
    subItems: [
      { name: "Profile", path: "/admin/settings/profile" },
      { name: "Security", path: "/admin/settings/security" },
      { name: "Notifications", path: "/admin/settings/notifications" },
      { name: "Change Password", path: "/admin/settings/change-password" },
    ],
  },
];
