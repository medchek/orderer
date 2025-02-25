import { ThemeType } from "@/features/settings/types";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";

interface Props
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "onClick" | "value"
  > {}

const themeOptions: Record<ThemeType, string> = {
  dark: "Sombre",
  light: "Claire",
  system: "Système",
};

export default function ThemeSelectInput({ className, ...props }: Props) {
  const { theme, setTheme } = useTheme();

  const switchTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = e.target.value.trim();
    // if the user messes with the values, do nothing
    if (value !== "dark" && value !== "light" && value !== "system") return;
    setTheme(value);
  };

  return (
    <select
      className={cn(
        "h-10 w-32 rounded-md bg-neutral-200 px-2 outline-hidden ring-secondary focus:ring-2 dark:bg-neutral-900",
        className,
      )}
      onChange={switchTheme}
      value={theme}
      {...props}
    >
      {(Object.keys(themeOptions) as ThemeType[]).map((themeKey) => (
        <option key={themeKey} value={themeKey}>
          {themeOptions[themeKey]}
        </option>
      ))}
    </select>
  );
}
