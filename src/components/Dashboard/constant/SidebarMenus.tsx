import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Heart,
  MapPin,
  TicketCheck,
  CreditCard,
  Package,
  PlusSquare,
  ShoppingCart,
  BarChart,
  BadgePercent,
  Wallet,
  Users,
  Star,
  Settings,
  Shield,
  Database,
  Activity,
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

export const vendorMenuItems = [
  { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
  { name: "My Products", href: "/vendor/products", icon: Package },
  { name: "Add Product", href: "/vendor/products/add", icon: PlusSquare },
  { name: "Orders", href: "/vendor/orders", icon: ShoppingCart },
  { name: "Sales Report", href: "/vendor/reports", icon: BarChart },
  { name: "Withdrawals", href: "/vendor/withdraw", icon: Wallet },
  { name: "Reviews", href: "/vendor/reviews", icon: Star },
  { name: "Shop Settings", href: "/vendor/settings", icon: Settings },
];

export const adminMenuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Vendors", href: "/admin/vendors", icon: Users },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Coupons", href: "/admin/coupons", icon: BadgePercent },
  { name: "Support Tickets", href: "/admin/tickets", icon: TicketCheck },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export const superAdminMenuItems = [
  { name: "System Overview", href: "/super-admin/dashboard", icon: Shield },
  { name: "Admins", href: "/super-admin/admins", icon: Users },
  { name: "Role Management", href: "/super-admin/roles", icon: Shield },
  { name: "System Settings", href: "/super-admin/settings", icon: Settings },
  { name: "Database Logs", href: "/super-admin/logs", icon: Database },
  { name: "Activity Monitor", href: "/super-admin/activity", icon: Activity },
];
