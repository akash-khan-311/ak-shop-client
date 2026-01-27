"use client";

import {
  ThemeAnimationType,
  useModeAnimation,
} from "react-theme-switch-animation";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function AppThemeSwitch() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.QR_SCAN,
    duration: 500, // Faster scan animation
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  return (
    <button
      aria-label="Toggle theme"
      className="cursor-pointer"
      ref={ref}
      onClick={toggleSwitchTheme}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}
