"use client";
import React from "react";
import ThemeSelectorButton from "./ThemeSelectorButton";
// import { useStore } from "@/store";
import { useTheme } from "next-themes";

export default function SettingsThemeSelector() {
  const { theme, setTheme } = useTheme();

  const switchTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value.trim();
    // if the user messes with the values, do nothing
    if (value !== "dark" && value !== "light" && value !== "system") return;
    setTheme(value);
  };

  return (
    <div className="flex gap-4">
      <ThemeSelectorButton
        inputValue="light"
        onChange={switchTheme}
        isSelected={theme === "light"}
      />
      <ThemeSelectorButton
        inputValue="dark"
        onChange={switchTheme}
        isSelected={theme === "dark"}
      />
      <ThemeSelectorButton
        inputValue="system"
        onChange={switchTheme}
        isSelected={theme === "system"}
      />
    </div>
  );
}
