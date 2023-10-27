export type SuccessfulOrder = {
  wilaya: {
    name: string;
    code: number;
    arName: string;
  };
  orderProducts: {
    product: {
      code: string;
      name: string;
      stock: number | null;
      price: number;
      images: {
        id: string;
      }[];
    };
  }[];
  createdAt: Date;
};

export type CurrentMonthOrder = {
  status: Status;
  createdAt: Date;
  orderProducts: {
    product: {
      price: number;
      discount: number | null;
    };
  }[];
};

export type ChartData = { name: string; sales: number; orders: number }[];
