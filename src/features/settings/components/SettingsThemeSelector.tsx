"use client";
import React from "react";
import ThemeSelectorButton from "./ThemeSelectorButton";
import { useStore } from "@/store";

export default function SettingsThemeSelector() {
  const { setTheme, theme } = useStore();

  const switchTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value.trim();
    // if the user messes with the values, do nothing
    if (value !== "dark" && value !== "light" && value !== "sys") return;

    localStorage.setItem("theme", value);
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
        inputValue="sys"
        onChange={switchTheme}
        isSelected={theme === "sys"}
      />
    </div>
  );
}
