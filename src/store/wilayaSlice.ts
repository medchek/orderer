import { STATUS_OK } from "@/lib/constants";
import { PromiseStatus } from "@/types/api";
import { StateCreator } from "zustand";

interface Wilaya {
  code: number;
  name: string;
  arName: string;
  officePrice: number;
  homePrice: number;
  /** This state property is included when the request is made by the admin. Available in dashboard.*/
  available?: boolean;
}

/** 
 * Wilaya State structure inside dashboard. 
 * 
 * The **available** state property is sent along with the regular wilaya data 
 * when the server responds to an admin user.
 * */
export interface WilayaWithAvailability extends Wilaya {
  available: boolean;
}

export interface WilayaSlice {
  wilayas: Wilaya[];
  selectedWilaya: Wilaya | null;
  isFetchingWilayas: boolean;
  wilayaFetchStatus: PromiseStatus;
  setSelectedWilaya: (selectedWilaya: Wilaya) => void;
  fetchPublicWilayas: () => Promise<{ status: PromiseStatus, wilayas: Wilaya[] }>;
  updateWilaya: (data: { homePrice?: number, officePrice?: number, available?: boolean, index: number }) => void;
}

export const uiSlice: StateCreator<WilayaSlice> = (set) => ({
  wilayas: [],
  selectedWilaya: null,
  isFetchingWilayas: false,
  wilayaFetchStatus: "init",
  setSelectedWilaya: (selectedWilaya: Wilaya) => {
    set(() => ({ selectedWilaya }));
  },
  fetchPublicWilayas: async () => {
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
  }
});
