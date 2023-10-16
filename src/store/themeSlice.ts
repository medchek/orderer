import { ThemeType } from "@/features/settings/types";
import { StateCreator } from "zustand";

export interface ThemeSlice {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const themeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: "sys",
  setTheme: (theme) => {
    set(() => ({
      theme,
    }));
  },
});
