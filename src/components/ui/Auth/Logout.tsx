"use client";
import { LogOut } from "lucide-react";
import React from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { baseApi } from "@/redux/api/baseApi";
export default function Logout({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const result = await logoutApi(undefined).unwrap();
      if (result.success) {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        toast.success("Logout successfully");
        router.replace("/signin");
      }
    } catch (error) {}
  };
  return (
    <button onClick={handleLogout} className={className}>
      <LogOut className="rotate-180" size={18} />
      <span>Logout</span>
    </button>
  );
}
