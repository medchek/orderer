export interface ShippingLocation {
  id: string;
  name: string;
  additionalCosts: number | null;
  coordinates: string | null;
  wilaya: {
    code: number;
    name: string;
    arName: string;
  };
  town: {
    code: number;
    name: string;
    arName: string;
  };
}

export type ShippingLocationsFormValues = {
  name: string;
  wilaya: string;
  town: string;
  additionalCosts: string;
  coordinates: string;
};

export type ShippingLocationsSubmitData = {
  name: string;
  wilaya: number;
  town: number;
  additionalCosts: number | null;
  coordinates: string | null;
};
