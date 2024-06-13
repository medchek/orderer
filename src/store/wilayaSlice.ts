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
  updateWilaya: (data: {
    homePrice?: number;
    officePrice?: number;
    available?: boolean;
    index: number;
  }) => void;
  setWilayas: (data: Wilaya[]) => void;
  getFilteredWilayas: (searchTerm: string) => Wilaya[];
}

export const wilayaSlice: StateCreator<WilayaSlice> = (set, get) => ({
  wilayas: [],
  setWilayas: (wilayas: Wilaya[]) => {
    return set(() => ({ wilayas }));
  },
  updateWilaya: (value: {
    homePrice?: number;
    officePrice?: number;
    available?: boolean;
    index: number;
  }) => {
    const { index, ...data } = value;
    set((state) => {
      const wilayasCopy = [...state.wilayas];
      // copy the new data into the existing one
      wilayasCopy[index] = Object.assign(wilayasCopy[index], data);
      return { wilayas: wilayasCopy };
    });
  },
  getFilteredWilayas: (term: string) => {
    console.log("running get filter");
    const searchTerm = term.trim().toLowerCase();
    const wilayas = [...get().wilayas];

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
      });
    }
  },
});
