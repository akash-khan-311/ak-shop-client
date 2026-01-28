"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { useOauthFinalizeMutation } from "@/redux/features/auth/authApi";

export default function AuthCallbackPage() {
  const [oauthFinalize] = useOauthFinalizeMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");

    if (success === "1") {
      oauthFinalize()
        .unwrap()
        .then(() => {
          router.replace("/dashboard"); // login success
        })
        .catch(() => {
          router.replace("/login?error=oauth");
        });
    } else {
      router.replace("/login?error=oauth");
    }
  }, [oauthFinalize, router, searchParams]);

  return <p>Signing you in...</p>;
}
