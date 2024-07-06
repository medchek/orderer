"use client";
import { type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
interface Props {
  children: ReactNode;
}

export default function AppThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider attribute="class">
      <div
        id="app-wrapper"
        className="h-full max-h-full overflow-auto dark:[color-scheme:dark]"
      >
        {children}
      </div>
    </NextThemesProvider>
  );
}
