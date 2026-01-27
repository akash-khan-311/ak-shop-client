"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function applyThemeFromStorage() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  } catch {}
}

export default function ThemeGuard() {
  const pathname = usePathname();

  useEffect(() => {
    // ✅ apply on every route change
    applyThemeFromStorage();

    // ✅ if any component removes/changes html class, force it back
    const obs = new MutationObserver(() => {
      const saved = localStorage.getItem("theme");
      const shouldBeDark = saved === "dark";
      const isDark = document.documentElement.classList.contains("dark");

      if (saved === "dark" && !isDark)
        document.documentElement.classList.add("dark");
      if (saved === "light" && isDark)
        document.documentElement.classList.remove("dark");
      if (!saved) return; // system fallback handled above
    });

    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, [pathname]);

  return null;
}
