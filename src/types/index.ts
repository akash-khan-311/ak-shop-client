import { LucideIcon } from "lucide-react";

export type TUser = {
  name: string;
  role: string;
  userId: number;
  iat: number;
  exp: number;
};

export type NavItem = {
  name: string;
  href?: string;
  icon: LucideIcon;
  subItems?: {
    name: string;
    path: string;
  }[];
};
