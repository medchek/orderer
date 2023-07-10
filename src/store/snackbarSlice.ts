import { StateCreator } from "zustand";

export type SnackType = "default" | "error" | "success" | "warning";

export interface SnackbarSlice {
  snackText: string;
  isSnackShown: boolean;
  stanckType: SnackType;
  showSnackbar: (text: string) => void;
  hideSnackbar: () => void;
  setSnackType: (type: SnackType) => void;
}

export const snackbarSlice: StateCreator<SnackbarSlice> = (set) => ({
  snackText: "",
  isSnackShown: false,
  stanckType: "default",
  showSnackbar: (text: string, type?: SnackType) => {
    set(() => ({
      isSnackShown: true,
      snackText: text,
      stanckType: type ?? "default",
    }));
  },
  hideSnackbar: () => {
    set(() => ({ isSnackShown: false, snackText: "" }));
  },
  setSnackType: (type: SnackType) => {
    set(() => ({ stanckType: type }));
  },
});
