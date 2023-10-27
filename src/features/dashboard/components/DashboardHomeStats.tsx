import DashboardHomeStatCol from "@/features/dashboard/components/DashboardHomeStatCol";

import { startOfMonth, startOfYesterday } from "date-fns";
import { prisma } from "../../../../prisma/db";
import { Status } from "@prisma/client";
import { CurrentMonthOrder } from "../types";
import { discountedPrice } from "@/lib/utils";

export default async function DashboardHomeStats() {
  const monthStartDate = startOfMonth(Date.now());

  const currentMonthOrders: CurrentMonthOrder[] = await prisma.order.findMany({
    select: {
      status: true,
      createdAt: true,
      orderProducts: {
        select: {
          product: {
            select: {
              price: true,
              discount: true,
            },
          },
        },
      },
    },
    where: {
      createdAt: {
        gte: monthStartDate,
      },
    },
  });
  const yesterdayStartDate = startOfYesterday().getTime();
  const lastTowDaysOrders: number = currentMonthOrders.filter(
    (order) => order.createdAt.getTime() >= yesterdayStartDate,
  ).length;

  const completedOrdersThisMonth = currentMonthOrders.filter(
    ({ status }) => status === Status.SUCCESS,
  );

  const soldProducts = completedOrdersThisMonth.reduce((prev, curr) => {
    return prev + curr.orderProducts.length;
  }, 0);

  const totalGains = completedOrdersThisMonth.reduce((prev, curr) => {
    const currentOrderTotalIncom = curr.orderProducts.reduce(
      (prevPrice, currentProduct) => {
        return (
          prevPrice +
          discountedPrice(
            currentProduct.product.price,
            currentProduct.product.discount ?? 0,
          )
        );
      },
      0,
    );
    return prev + currentOrderTotalIncom;
  }, 0);

  return (
    <div id="stats" className="grid h-28 min-h-[7rem] grid-cols-4 gap-2">
      <DashboardHomeStatCol
        label="Nouvelles Commandes"
        text={lastTowDaysOrders}
        subText="Depuis hier"
      />
      <DashboardHomeStatCol
        label="Produits vendus"
        text={soldProducts}
        subText="Ce mois"
      />
      <DashboardHomeStatCol
        label="Commandes"
        text={currentMonthOrders.length}
        subText="Ce mois"
      />
      <DashboardHomeStatCol
        label="Total Ventes"
        text={`${totalGains}DA`}
        subText="Ce mois"
      />
    </div>
  );
}
