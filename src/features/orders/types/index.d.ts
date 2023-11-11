import { Status } from "@prisma/client";

export interface OrderData {
  address: string | null;
  code: string;
  isHome: boolean;
  status: Status;
  createdAt: Date;
  location: {
    name: string;
    additionalCosts: number | null;
  } | null;
  user: {
    phone: string | null;
    blacklist: {
      phone: string;
      reason: string | null;
    } | null;
  };
  wilaya: {
    name: string;
    arName: string;
    code: number;
    homePrice: number;
    officePrice: number;
  };
  town: {
    code: number;
    arName: string;
    name: string;
  };
  orderProducts: {
    product: {
      name: string;
      price: number;
      discount: number;
    };
  }[];
}

export interface PublicOrderData {
  address: string | null;
  code: string;
  isHome: boolean;
  status: Status;
  createdAt: Date;
  user: {
    phone: string | null;
  };
  location: {
    name: string;
    additionalCosts: number | null;
  } | null;
  wilaya: {
    name: string;
    arName: string;
    code: number;
    homePrice: number;
    officePrice: number;
  };
  town: {
    code: number;
    arName: string;
    name: string;
  };
  orderProducts: {
    product: {
      name: string;
      price: number;
      discount: number;
    };
  }[];
}
