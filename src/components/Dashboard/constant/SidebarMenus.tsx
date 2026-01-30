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
  DollarSign,
  Banknote,
  Boxes,
  TicketPercent,
  Store,
  Box,
  Settings2,
  Ticket,
  ListChecks,
  Blocks,
  BarChart3,
  Megaphone,
  FileText,
  LifeBuoy,
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

export const adminMenuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  /* ---------------- USERS ---------------- */
  {
    name: "Users",
    icon: Users,
    subItems: [
      { name: "All Users", path: "/admin/users" },
      { name: "Vendors", path: "/admin/vendors" },
      { name: "Admins", path: "/admin/admins" },
      { name: "Blocked Users", path: "/admin/users/blocked" },
    ],
  },
  // --------------Category-----------------
  {
    name: "Category",
    icon: ListChecks,
    subItems: [
      { name: "All Category", path: "/admin/category" },
      { name: "Add Category", path: "/admin/category/add" },
      { name: "Sub Category", path: "/admin/category/subcategory" },
    ],
  },

  /* ---------------- VENDORS ---------------- */
  {
    name: "Vendor Management",
    icon: Store,
    subItems: [
      { name: "Vendor Requests", path: "/admin/vendors/requests" },
      { name: "Approved Vendors", path: "/admin/vendors/approved" },
      { name: "Suspended Vendors", path: "/admin/vendors/suspended" },
      { name: "Vendor Payouts", path: "/admin/vendors/payouts" },
    ],
  },

  /* ---------------- PRODUCTS ---------------- */
  {
    name: "Products",
    icon: Box,
    subItems: [
      { name: "All Products", path: "/admin/products" },
      { name: "Pending Approval", path: "/admin/products/pending" },
      { name: "Reported Products", path: "/admin/products/reported" },
    ],
  },

  /* ---------------- CATEGORY ---------------- */
  {
    name: "Categories",
    icon: ListChecks,
    subItems: [
      { name: "All Categories", path: "/admin/categories" },
      { name: "Sub Categories", path: "/admin/categories/sub" },
      { name: "Category Requests", path: "/admin/categories/requests" },
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

  /* ---------------- ORDERS ---------------- */
  {
    name: "Orders",
    icon: ShoppingBag,
    subItems: [
      { name: "All Orders", path: "/admin/orders" },
      { name: "Returns & Refunds", path: "/admin/orders/returns" },
      { name: "Disputes", path: "/admin/orders/disputes" },
    ],
  },

  /* ---------------- FINANCE ---------------- */
  {
    name: "Finance",
    icon: DollarSign,
    subItems: [
      { name: "Commission Settings", path: "/admin/finance/commission" },
      { name: "Payout Requests", path: "/admin/finance/payouts" },
      { name: "Transactions", path: "/admin/finance/transactions" },
    ],
  },

  /* ---------------- MARKETING ---------------- */
  {
    name: "Marketing",
    icon: Megaphone,
    subItems: [
      { name: "Coupons", path: "/admin/coupons" },
      { name: "Campaigns", path: "/admin/campaigns" },
      { name: "Banners", path: "/admin/banners" },
    ],
  },

  /* ---------------- CMS ---------------- */
  {
    name: "Content",
    icon: FileText,
    subItems: [
      { name: "Pages", path: "/admin/pages" },
      { name: "Blogs", path: "/admin/blogs" },
      { name: "FAQs", path: "/admin/faqs" },
    ],
  },

  /* ---------------- SUPPORT ---------------- */
  {
    name: "Support",
    icon: LifeBuoy,
    subItems: [
      { name: "Support Tickets", path: "/admin/tickets" },
      { name: "Vendor Disputes", path: "/admin/disputes" },
    ],
  },

  /* ---------------- REPORTS ---------------- */
  {
    name: "Reports & Analytics",
    icon: BarChart3,
    subItems: [
      { name: "Sales Report", path: "/admin/reports/sales" },
      { name: "Vendor Performance", path: "/admin/reports/vendors" },
      { name: "Product Insights", path: "/admin/reports/products" },
    ],
  },

  /* ---------------- SYSTEM ---------------- */
  {
    name: "System Settings",
    icon: Settings,
    subItems: [
      { name: "General Settings", path: "/admin/settings" },
      { name: "Roles & Permissions", path: "/admin/settings/roles" },
      { name: "Security Logs", path: "/admin/settings/logs" },
    ],
  },
];

export const vendorMenuItems = [
  { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },

  {
    name: "Products",
    icon: Box,
    subItems: [
      { name: "All Products", path: "/vendor/products" },
      { name: "Add Product", path: "/vendor/products/add" },
    ],
  },

  {
    name: "Orders",
    href: "/vendor/orders",
    icon: ShoppingBag,
  },

  {
    name: "Earnings",
    icon: DollarSign,
    subItems: [
      { name: "Wallet", path: "/vendor/earnings" },
      { name: "Payouts", path: "/vendor/payouts" },
    ],
  },

  {
    name: "Tickets",
    href: "/vendor/tickets",
    icon: Ticket,
  },

  {
    name: "Reviews",
    href: "/vendor/reviews",
    icon: Star,
  },

  {
    name: "Coupons",
    href: "/vendor/coupons",
    icon: TicketPercent,
  },

  {
    name: "Store Settings",
    href: "/vendor/store",
    icon: Store,
  },
  {
    name: "Settings",
    icon: Settings,
    subItems: [
      { name: "Profile", path: "/vendor/settings/profile" },
      { name: "Security", path: "/vendor/settings/security" },
      { name: "Notifications", path: "/vendor/settings/notifications" },
      { name: "Change Password", path: "/vendor/settings/change-password" },
    ],
  },
];
