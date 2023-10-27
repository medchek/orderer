import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import Link from "next/link";
import React from "react";
import { prisma } from "../../../../prisma/db";
import DashboardHomeLatestOrdersCard from "./DashboardHomeLatestOrdersCard";
import { calculateTotalPrice, discountedPrice } from "@/lib/utils";

export default async function DashboardHomeLatestOrders() {
  const latestOrders = await prisma.order.findMany({
    select: {
      status: true,
      user: {
        select: {
          phone: true,
        },
      },
      isHome: true,
      orderProducts: {
        select: {
          product: {
            select: {
              name: true,
              price: true,
              discount: true,
            },
          },
        },
      },
      location: {
        select: {
          additionalCosts: true,
        },
      },

      wilaya: {
        select: {
          name: true,
          arName: true,
          homePrice: true,
          officePrice: true,
        },
      },
      town: {
        select: {
          name: true,
          arName: true,
        },
      },
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  const displayOrdersCards = () => {
    if (latestOrders.length === 0) {
      return (
        <DashboardEmptyState
          Icon={<></>}
          text="Aucune commande récente"
          subContent="Les commandes récentes apparaîtront ici lorsque vos utilisateurs commanderont"
          noTranslate
          className="row-span-4"
          contentClassName="w-auto xl:w-96"
        />
      );
    }

    return latestOrders.map((order, i) => {
      const {
        user: { phone },
        location,
        orderProducts,
        town,
        wilaya,
        status,
        isHome,
      } = order;
      if (!phone) return;

      const combinedProductsPrice = orderProducts.reduce(
        (prevVal, currentVal) => {
          return (
            prevVal +
            discountedPrice(
              currentVal.product.price,
              currentVal.product.discount,
            )
          );
        },
        0,
      );

      const totalPrice = calculateTotalPrice({
        productsPrice: combinedProductsPrice,
        shippingPrice: isHome ? wilaya.homePrice : wilaya.officePrice,
        additionalCosts: location?.additionalCosts ?? 0,
      });

      return (
        <DashboardHomeLatestOrdersCard
          key={i}
          phone={phone}
          status={status}
          townName={town.name}
          wilayaName={wilaya.name}
          products={orderProducts.map((p) => p.product.name)}
          totalPrice={totalPrice}
        />
      );
    });
  };

  return (
    <div
      id="latest-orders"
      className="flex grow flex-col gap-1 rounded-xl bg-neutral-200 p-4 dark:bg-neutral-950"
    >
      <div className="flex h-8 items-center justify-between">
        <h2 className=" text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Commandes Récentes
        </h2>
        <Link
          href="./dashboard/orders"
          className="text-sm text-blue-500 hover:underline"
        >
          Voir Tout
        </Link>
      </div>
      <div className="flex grow flex-col gap-2">{displayOrdersCards()}</div>
      {/* <div className="mt-2 flex items-end justify-end">

  </div> */}
    </div>
  );
}
