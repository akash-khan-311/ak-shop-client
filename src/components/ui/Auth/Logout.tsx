"use client";
import { LogOut } from "lucide-react";
import React from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/auth/authSlice";
export default function Logout({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("accessToken");
    router.push("/signin");
  };
  return (
    <button onClick={handleLogout} className={className}>
      <LogOut className="rotate-180" size={18} />
      <span>Logout</span>
    </button>
  );
}
