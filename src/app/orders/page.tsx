import { getSession } from "../api/auth/[...nextauth]/route";
import { RedirectType, redirect } from "next/navigation";
import HomeHeader from "@/components/home/HomeHeader";
import BackButton from "@/components/BackButton";
import { prisma } from "../../../prisma/db";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import { LiaShippingFastSolid } from "react-icons/lia";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import OrdersCard from "@/features/orders/components/OrdersCard";
import { toPositiveNumber } from "@/lib/utils";
import OrdersPagination from "@/features/orders/components/OrdersPagination";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) {
  const session = await getSession();

  if (!session || !session.user) {
    return redirect("/login", RedirectType.replace);
  }
  const isAdmin = session.user.email === process.env.GOOGLE_ADMIN_EMAIL;

  const ordersPerPage = 5;
  const currentPage =
    searchParams && searchParams.page ? toPositiveNumber(searchParams.page) : 0;

  const count = await prisma.order.count({
    where: { userId: session.user.id },
  });
  const pageCount = Math.ceil((count ?? 0) / ordersPerPage);

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      address: true,
      code: true,
      isHome: true,
      status: true,
      createdAt: true,
      phone: {
        select: {
          phone: true,
        },
      },
      location: {
        select: {
          additionalCosts: true,
          name: true,
        },
      },
      wilaya: {
        select: {
          name: true,
          arName: true,
          code: true,
          homePrice: true,
          officePrice: true,
        },
      },
      town: {
        select: {
          name: true,
          arName: true,
          code: true,
        },
      },
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
    },
    orderBy: {
      createdAt: "desc",
    },
    take: ordersPerPage,
    skip: currentPage <= pageCount ? currentPage * ordersPerPage : 0,
  });

  const displayOrders = () => {
    if (orders.length === 0) {
      return (
        <div className="flex h-full w-full grow items-center justify-center">
          <DashboardEmptyState
            className="relative"
            text="Vous n'avez pas encore de commande"
            subContent={
              <Link
                href="./"
                className="flex h-10 items-center justify-center rounded-lg px-2 text-sm font-semibold transition-colors hover:bg-neutral-200 focus:bg-neutral-300 dark:hover:bg-neutral-900 dark:focus:bg-neutral-950"
              >
                <MdAdd className="h-6 w-6" />
                Créer une commander
              </Link>
            }
            Icon={<LiaShippingFastSolid className="h-10 w-10" />}
          />
        </div>
      );
    } else {
      return orders.map((order) => <OrdersCard {...order} key={order.code} />);
    }
  };

  return (
    <main className="flex h-screen max-h-screen flex-col px-4 xl:px-10 2xl:px-56">
      <HomeHeader isAdmin={isAdmin} />
      <div className="flex grow flex-col gap-2 overflow-hidden">
        <div className="flex h-8 min-h-[2rem] gap-1 dark:text-neutral-100">
          <BackButton />
          <h1 className="text-lg font-semibold">Vos Commandes</h1>
        </div>
        <section className="full mb-3 flex h-full grow flex-col gap-2 overflow-y-auto overflow-x-hidden">
          {displayOrders()}
        </section>
      </div>
      <OrdersPagination pageCount={pageCount} />
    </main>
  );
}
