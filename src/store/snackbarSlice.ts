import { StateCreator } from "zustand";

export type SnackType = "default" | "error" | "success" | "warning";

export interface SnackbarSlice {
  snackText: string;
  isSnackShown: boolean;
  snackType: SnackType;
  snackTimeout: number;
  showSnackbar: (text: string, type?: SnackType, time?: number) => void;
  hideSnackbar: () => void;
  setSnackType: (type: SnackType) => void;
  setSnackTimeout: (time: number) => void;
}

export const snackbarSlice: StateCreator<SnackbarSlice> = (set) => ({
  snackText: "",
  isSnackShown: false,
  snackType: "default",
  snackTimeout: 5000,
  showSnackbar: (text: string, type?: SnackType, time?: number) => {
    set(() => ({
      isSnackShown: true,
      snackText: text,
      snackType: type ?? "default",
      snackTimeout: time ?? 5000,
    }));
  },
  hideSnackbar: () => {
    set(() => ({ isSnackShown: false, snackText: "" }));
  },
  setSnackType: (type: SnackType) => {
    set(() => ({ snackType: type }));
  },
  setSnackTimeout: (time: number) => {
    set(() => ({ snackTimeout: time }));
  },
});
