"use client";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

// Dark mode toggle button for the top-right corner
export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  return (
    <button
      aria-label="Toggle dark mode"
      className="fixed top-4 right-4 z-50 p-2 rounded-full glass soft-light shadow-lg transition-colors"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? (
        <SunIcon className="w-6 h-6 text-yellow-300" />
      ) : (
        <MoonIcon className="w-6 h-6 text-blue-400" />
      )}
    </button>
  );
} 