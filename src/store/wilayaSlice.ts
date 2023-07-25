import { STATUS_OK } from "@/lib/constants";
import { PromiseStatus } from "@/types/api";
import { StateCreator } from "zustand";

export interface Wilaya {
  code: number;
  name: string;
  arName: string;
  officePrice: number;
  homePrice: number;
  availableHome: boolean;
  availableOffice: boolean;
}

export interface WilayaSlice {
  wilayas: Wilaya[];
  selectedWilaya: Wilaya | null;
  isFetchingWilayas: boolean;
  wilayaFetchStatus: PromiseStatus;
  setSelectedWilaya: (selectedWilaya: Wilaya) => void;
  fetchWilayas: () => Promise<{ status: PromiseStatus, wilayas: Wilaya[] }>;
  updateWilaya: (data: { homePrice?: number, officePrice?: number, available?: boolean, index: number }) => void;
  getFilteredWilayas: (searchTerm: string) => Wilaya[]
}

export const uiSlice: StateCreator<WilayaSlice> = (set, get) => ({
  wilayas: [],
  selectedWilaya: null,
  isFetchingWilayas: false,
  wilayaFetchStatus: "init",
  setSelectedWilaya: (selectedWilaya: Wilaya) => {
    set(() => ({ selectedWilaya }));
  },
  fetchWilayas: async () => {
    try {
      set(() => ({ isFetchingWilayas: true, wilayaFetchStatus: "fetching" }));

      const response = await fetch("/api/wilayas", {
        method: "GET",
      });
      const wilayas: Wilaya[] = await (response.json());
      const promiseStatus = response.status === STATUS_OK ? "success" : "error"
      set(() => ({ wilayas, isFetchingWilayas: false, wilayaFetchStatus: promiseStatus }));

      return { status: promiseStatus, wilayas }
    } catch (e) {
      console.error(e);
      set(() => ({ isFetchingWilayas: true, wilayaFetchStatus: "error" }));
      throw new Error("Error fetching wilayas");
    }
  },
  updateWilaya: (value: { homePrice?: number, officePrice?: number, available?: boolean, index: number }) => {
    const { index, ...data } = value;
    set((state) => {
      const wilayasCopy = [...state.wilayas];
      // copy the new data into the existing one
      wilayasCopy[index] = Object.assign(wilayasCopy[index], data);
      return { wilayas: wilayasCopy }
    })
  },
  getFilteredWilayas: (term: string) => {
    console.log("running get filter")
    const searchTerm = term.trim().toLowerCase();
    const wilayas = [...get().wilayas]

    if (!searchTerm.length) {
      // only if no filter was applied before
      return wilayas;
    } else {
      const isWilayaCode = /^[1-9][0-9]?$/g.test(searchTerm);

      return wilayas.filter(({ code, name }) => {
        if (isWilayaCode) {
          return code === parseInt(searchTerm);
        } else {
          return name.toLocaleLowerCase().includes(searchTerm);
        }
      })

    }
  }
});
