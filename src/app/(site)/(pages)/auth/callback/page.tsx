"use client";

import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOauthFinalizeMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

export default function AuthCallbackPage() {
  const [oauthFinalize] = useOauthFinalizeMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const success = searchParams.get("success");
    const message = searchParams.get("message");

    if (success === "1") {
      oauthFinalize()
        .unwrap()
        .then(() => router.replace("/dashboard"))
        .catch(() => {
          toast.error("OAuth finalize failed. Please try again.");
          router.replace("/login?error=oauth");
        });
      return;
    }

    // ✅ blocked or other failure
    if (message) toast.error(decodeURIComponent(message));
    else toast.error("Login failed. Please try again.");

    router.replace("/signin");
  }, [oauthFinalize, router, searchParams]);

  return (
    <p className="text-center min-h-screen flex justify-center items-center text-2xl">
      Signing you in...
    </p>
  );
}
