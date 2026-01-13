import { cookies } from "next/headers";

export const getToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || null;
    return token;
  } catch (err) {
    console.error("Error getting token from cookies:", err);
    return null;
  }
};
