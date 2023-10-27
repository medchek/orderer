import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import Link from "next/link";
import DashboardHomeTopProductsCard from "./DashboardHomeTopProductsCard";
import { SuccessfulOrder } from "../types";

interface Props {
  completedOrders: SuccessfulOrder[];
}

export default async function DashboardHomeTopProducts({
  completedOrders,
}: Props) {
  const displayTopProducts = () => {
    if (completedOrders.length === 0) {
      return (
        <DashboardEmptyState
          Icon={<></>}
          text="Données insuffisantes"
          subContent="Vos top produits vont apparaître ici à mesure que vous complètez des commandes"
          noTranslate
          className="row-span-3"
          contentClassName="w-auto xl:w-96"
        />
      );
    }

    const topProducts: {
      [productCode: string]: {
        count: number;
        product: {
          name: string;
          code: string;
          price: number;
          stock: number | null;
          images: {
            id: string;
          }[];
        };
      };
    } = {};

    for (let i = 0; i < completedOrders.length; i++) {
      const orderProducts = completedOrders[i].orderProducts;

      for (let j = 0; j < orderProducts.length; j++) {
        const product = orderProducts[j].product;
        // if the product has not been added yet to the object, add it
        if (topProducts[product.code] === undefined) {
          topProducts[product.code] = { count: 1, product };
        } else {
          // otherwise, only increment the product count
          topProducts[product.code].count += 1;
        }
      }
    }

    return Object.values(topProducts)
      .sort((a, b) => {
        return b.count - a.count;
      })
      .slice(0, 3)
      .map((p) => {
        const {
          count,
          product: { images, name, price, stock, code },
        } = p; // p = product
        return (
          <DashboardHomeTopProductsCard
            key={code}
            count={count}
            imageId={images[0].id}
            name={name}
            price={price}
            stock={stock}
          />
        );
      });
  };

  return (
    <section
      id="top-products"
      className="flex h-80 min-h-[20rem] flex-col gap-2 rounded-xl  bg-neutral-200 p-4 dark:bg-neutral-950"
    >
      <div className="flex h-8 items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Top Produits
        </h2>
        <Link
          href="./dashboard/products"
          className="text-sm text-blue-500 hover:underline"
        >
          Voir Tout
        </Link>
      </div>
      <div className="grid grow grid-rows-3 gap-2">{displayTopProducts()}</div>
    </section>
  );
}
