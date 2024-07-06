import { Status } from "@prisma/client";

/** The object structure of orders data for admin users  */
export interface AdminOrderData {
  address: string | null;
  code: string;
  isHome: boolean;
  status: Status;
  createdAt: Date;
  location: {
    name: string;
    additionalCosts: number | null;
  } | null;
  phone: {
    isBlacklisted: boolean;
    blacklistReason: string | null;
    phone: string;
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
    price: number;
    discount: number;
    product: {
      name: string;
      price: number;
      discount: number;
    };
  }[];
}
/** The object structure of orders data for non-admin users  */
export interface PublicOrderData {
  address: string | null;
  code: string;
  isHome: boolean;
  status: Status;
  createdAt: Date;
  phone: {
    phone: string;
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
