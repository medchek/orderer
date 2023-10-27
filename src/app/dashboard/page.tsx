// import AuthProvider from "@/components/AuthProvider";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardHomeLatestOrders from "@/features/dashboard/components/DashboardHomeLatestOrders";
import DashboardHomeStats from "@/features/dashboard/components/DashboardHomeStats";
import DashboardHomeTopProducts from "@/features/dashboard/components/DashboardHomeTopProducts";
import DashboardHomeTopWilayas from "@/features/dashboard/components/DashboardHomeTopWilayas";
import DashboardHomeVisualize from "@/features/dashboard/components/DashboardHomeVisualize";
import { SuccessfulOrder } from "@/features/dashboard/types";
import { prisma } from "../../../prisma/db";
import { Status } from "@prisma/client";

export default async function Dashboard() {
  const completedOrders: SuccessfulOrder[] = await prisma.order.findMany({
    where: {
      status: {
        equals: Status.SUCCESS,
      },
    },
    select: {
      wilaya: {
        select: {
          name: true,
          code: true,
          arName: true,
        },
      },
      orderProducts: {
        select: {
          product: {
            select: {
              code: true,
              name: true,
              stock: true,
              price: true,
              images: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      createdAt: true,
    },
  });

  return (
    <div id="dashboard-home" className="flex grow flex-col px-6 py-3">
      <DashboardHeader label="Acceuil" noPadding />
      {/* <DashboardProductsToolbar />
      <DashboardProductDisplay /> */}
      <div id="main" className="grid h-full w-full grow grid-cols-12 gap-2">
        <div id="left-panel" className="col-span-8 flex flex-col gap-3 ">
          <DashboardHomeStats />
          <div id="left-panel-wrapper" className="flex grow flex-col gap-2">
            <DashboardHomeVisualize />
            <DashboardHomeTopProducts completedOrders={completedOrders} />
          </div>
        </div>
        <div id="side-panel" className="col-span-4 flex flex-col gap-2 ">
          <DashboardHomeLatestOrders />
          <DashboardHomeTopWilayas completedOrders={completedOrders} />
        </div>
      </div>
    </div>
  );
}
