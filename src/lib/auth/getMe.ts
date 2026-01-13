"use server";
import config from "@/config";
import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || null;

  if (!token) return null;

  try {
    const res = await fetch(`${config.apiBaseUrl}/v1/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `${token}`, // always Bearer
      },
      cache: "no-store",
      credentials: "include",
    });
    console.log(res);
    if (!res.ok) return null;

    const result = await res.json();
    return result.data;
  } catch (err) {
    console.error("Server getMe error:", err);
    return null;
  }
};
