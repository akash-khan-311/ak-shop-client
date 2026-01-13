import {
  LayoutDashboard,
  Package,
  PlusSquare,
  ShoppingCart,
  BarChart,
  Wallet,
  Star,
  Settings,
} from "lucide-react";
const vendorMenuItems = [
  {
    name: "Dashboard",
    href: "/vendor/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "My Products",
    href: "/vendor/products",
    icon: <Package size={20} />,
  },
  {
    name: "Add Product",
    href: "/vendor/products/add",
    icon: <PlusSquare size={20} />,
  },
  { name: "Orders", href: "/vendor/orders", icon: <ShoppingCart size={20} /> },
  {
    name: "Sales Report",
    href: "/vendor/reports",
    icon: <BarChart size={20} />,
  },
  { name: "Withdrawals", href: "/vendor/withdraw", icon: <Wallet size={20} /> },
  { name: "Reviews", href: "/vendor/reviews", icon: <Star size={20} /> },
  {
    name: "Shop Settings",
    href: "/vendor/settings",
    icon: <Settings size={20} />,
  },
];
export default function VendorMenu() {
  return <div>VendorMenu</div>;
}
