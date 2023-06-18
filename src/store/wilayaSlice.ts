import { StateCreator } from "zustand";

interface Wilaya {
  code: number;
  name: string;
  arName: string;
  officePrice: number;
  homePrice: number;
}

export interface WilayaSlice {
  wilayas: Wilaya[];
  selectedWilaya: Wilaya | null;
  isFetchingWilayas: boolean;
  setSelectedWilaya: (selectedWilaya: Wilaya) => void;
  fetchPublicWilayas: () => Promise<void>;
}

export const uiSlice: StateCreator<WilayaSlice> = (set) => ({
  wilayas: [],
  selectedWilaya: null,
  isFetchingWilayas: false,
  setSelectedWilaya: (selectedWilaya: Wilaya) => {
    set((state) => ({ selectedWilaya }));
  },
  fetchPublicWilayas: async () => {
    try {
      set(() => ({ isFetchingWilayas: true }));

      const data = await fetch("/api/wilayas", {
        method: "GET",
      });
      const wilayas = await (data.json() as Promise<Wilaya[]>);
      set(() => ({ wilayas, isFetchingWilayas: false }));
    } catch (e) {
      console.error(e);
      set(() => ({ isFetchingWilayas: true }));
      throw new Error("Error fetching wilayas");
    }
  },
});
