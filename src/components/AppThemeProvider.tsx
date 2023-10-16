"use client";
import { ThemeType } from "@/features/settings/types";
import { useStore } from "@/store";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { useEffect, type ReactNode, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  children: ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

export default function AppThemeProvider({ children }: Props) {
  const { theme, setTheme } = useStore();
  const [isDark, setIsDark] = useState(false);

  const isSystemDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme") as ThemeType | null;
    if (localStorageTheme !== null) {
      setIsDark(
        localStorageTheme === "dark" ||
          (localStorageTheme === "sys" && isSystemDark),
      );
    } else {
      setIsDark(isSystemDark);
    }
  }, [isSystemDark, setTheme]);

  useEffect(() => {
    setIsDark(theme === "dark" || (theme === "sys" && isSystemDark));
  }, [isSystemDark, theme]);

  return (
    <body
      className={clsx(`relative ${inter.className} h-screen max-h-screen`, {
        dark: isDark,
      })}
    >
      <div
        id="app-wrapper"
        className="h-screen max-h-screen bg-neutral-100 dark:bg-dark dark:[color-scheme:dark]"
      >
        {children}
      </div>
    </body>
  );
}
