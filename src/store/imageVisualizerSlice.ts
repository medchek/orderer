import { Product } from "@/features/products/types";
import { StateCreator } from "zustand";

export type SnackType = "default" | "error" | "success" | "warning";

type ImageVisualizer = Product["images"];

export interface ImageVisualizerSlice {
  imageVisualizerIds: ImageVisualizer | null;
  setVisualizerImageIds: (ids: ImageVisualizer) => void;
  resetImageVisualizer: () => void;
}

export const imageVisualizerSlice: StateCreator<ImageVisualizerSlice> = (
  set,
) => ({
  imageVisualizerIds: null,
  setVisualizerImageIds: (ids) => {
    set(() => ({ imageVisualizerIds: ids }));
  },
  resetImageVisualizer: () => {
    set(() => ({ imageVisualizerIds: null }));
  },
});
