import RouteLoader from "@/components/RouteLoader";
import dynamic from "next/dynamic";
import { addWeeks, endOfWeek, startOfMonth } from "date-fns";
import { prisma } from "../../../../prisma/db";
import { Status } from "@prisma/client";
import { ChartData } from "../types";
import { addPartitive, getMonthName } from "@/lib/utils";
const DashboardHomeChart = dynamic(() => import("./DashboardHomeChart"), {
  loading: () => <RouteLoader loaderClassName="h-7 w-7" />,
  ssr: false,
});

export default async function DashboardHomeVisualize() {
  const monthStartDate = startOfMonth(Date.now());

  const monthlyOrders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: monthStartDate,
      },
      OR: [
        {
          NOT: {
            status: {
              equals: Status.CANCELED,
            },
          },
        },
        {
          NOT: {
            status: {
              equals: Status.RETURNED,
            },
          },
        },
      ],
    },
    select: {
      status: true,
      createdAt: true,
      orderProducts: {
        select: {
          product: {
            select: {
              code: true,
            },
          },
        },
      },
    },
  });

  // TODO: improve perf by using an object for each week and iterating through all the records once, checking the date for every record
  const generateChartData = (): ChartData => {
    const data: ChartData = [];
    for (let week = 0; week < 4; week++) {
      const currentWeekStart = addWeeks(monthStartDate, week).getTime();
      const currentWeekEnd = endOfWeek(currentWeekStart).getTime();

      let weekySalesCount = 0;
      let weeklyOrdersCount = 0;
      for (let i = 0; i < monthlyOrders.length; i++) {
        const order = monthlyOrders[i];
        const orderProductsCount = order.orderProducts.length;
        const orderTimestamp = order.createdAt.getTime();

        if (
          orderTimestamp >= currentWeekStart &&
          orderTimestamp <= currentWeekEnd
        ) {
          if (order.status === Status.SUCCESS) {
            weekySalesCount += orderProductsCount;
          }
          // increment the order count for the current week
          weeklyOrdersCount++;
        }
      }
      data.push({
        name: `Semaine ${week + 1}`,
        sales: weekySalesCount,
        orders: weeklyOrdersCount,
      });
    }
    return data;
  };

  // generateChartData();
  return (
    <div
      id="visuals"
      className="flex grow flex-col rounded-xl bg-neutral-200 p-4 dark:bg-neutral-950"
    >
      <div className="flex h-10 min-h-[2rem] items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Visualisation
        </h2>
        <div className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-100 [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:before:inline-block [&>span]:before:h-1 [&>span]:before:w-6 [&>span]:before:rounded-full [&>span]:before:content-['']">
          <span className="before:bg-teal-500">Produits vendus</span>
          <span className="before:bg-sky-500">Commandes</span>
        </div>
      </div>
      <div className="grow">
        <DashboardHomeChart data={generateChartData()} />
      </div>
      <p className="w-full text-center text-sm text-neutral-500">
        Données du mois {addPartitive(getMonthName(new Date().getMonth() + 1))}
      </p>
    </div>
  );
}
