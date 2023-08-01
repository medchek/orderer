"use client";

import ModalLoader from "@/components/ModalLoader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";
import { deleteOrder, getOrders } from "@/lib/clientApiHelpers";
import {
  addPartitive,
  discountedPrice,
  formatDate,
  trucateString,
} from "@/lib/utils";
import dynamic from "next/dynamic";
import { useState } from "react";
import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsListNested } from "react-icons/bs";
import { useStore } from "@/store";
import { createPortal } from "react-dom";

const DashboardDeleteConfirm = dynamic(
  () => import("@/components/dashboard/DashboardDeleteConfirm"),
  { loading: () => <ModalLoader /> }
);

type Props = {};

export default function Orders({}: Props) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useStore();
  const [hasFetched, setHasFetched] = useState(false);

  const portalTargetElementId = "dashboard-orders-table-errors-display";

  const { isFetching, data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    keepPreviousData: true,
    retryDelay: 2000,
    cacheTime: 1000 * 60 * 10,
    onSuccess: () => {
      setHasFetched(true);
    },
    enabled: !hasFetched,
  });

  const [orderCodeToDelete, setOrderCodeToDelete] = useState<string | null>(
    null
  );
  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation({
    mutationKey: ["deleteOrder"],
    mutationFn: deleteOrder,
    onSuccess(deletedOrderCode) {
      if (!ordersData) return;
      const ordersDataCopy = ordersData.filter(
        (order) => order.code !== deletedOrderCode
      );
      queryClient.setQueryData(["orders"], ordersDataCopy);
      // close the modal
      setOrderCodeToDelete(null);
      showSnackbar("Commande supprimée!", "default");
    },
  });

  const displayData = () => {
    if (isFetching) {
      // SKELETON LOADERS
      return Array.from({ length: 11 }, (_, i) => (
        <tr key={`tr-${i}`} className="h-16 animate-pulse">
          {Array.from({ length: 9 }, (_, idx) => (
            <td key={`td-${idx}`}>
              <div className="bg-stone-800 h-6 w-4/5 rounded-lg"></div>
            </td>
          ))}
        </tr>
      ));
    } else {
      // no data
      if (!ordersData || ordersData.length === 0) {
        return createPortal(
          <div className="w-96 h-auto  -translate-y-12">
            {/* <div className="flex justify-center items-center w-full h-full  -translate-y-12"> */}
            <div className="w-96 text-center flex flex-col items-center gap-1  text-stone-100">
              <BsListNested className="w-20 h-20" />
              <p>Aucune commande n'a été encore enregistrée</p>
              <p className="text-stone-400 text-sm">
                Vous serez informé via les notifications chaque fois qu'une
                nouvelle commande est enregistrée
              </p>
            </div>
            {/* </div> */}
          </div>,
          document.getElementById(portalTargetElementId) as Element
        );
      }
      // DATA Display
      else
        return ordersData?.map((order) => {
          const {
            address,
            code,
            createdAt,
            isHome,
            orderProducts,
            status,
            user,
            wilaya,
          } = order;
          const totalPrice = () => {
            const productsPrice = orderProducts.reduce((prev, { product }) => {
              return prev + discountedPrice(product.price, product.discount);
            }, 0);

            const shippingPrice = isHome
              ? wilaya.homePrice
              : wilaya.officePrice;

            return productsPrice + shippingPrice;
          };

          return (
            <tr
              key={code}
              className="h-28 max-h-[7rem] [&>td]:pr-4 [&>td]:pt-4 [&>td]:align-top overflow-hidden"
            >
              <td className="text-stone pl-4" title={code}>
                {trucateString(code, 6)}
              </td>
              <td className="font-semibold">{user.phone}</td>
              <td>{wilaya.name}</td>
              <td>
                {isHome
                  ? address
                  : `Bureau de livraison de la wilaya ${addPartitive(
                      wilaya.name
                    )}`}
              </td>
              <td className="[&>p]:line-clamp-1">
                {orderProducts.map(({ product }, i) => (
                  <p key={i}>{product.name}</p>
                ))}
              </td>
              <td>{totalPrice()}DA</td>
              <td>
                <p className="flex w-fullitems-center justify-center rounded-lg bg-stone-950 p-1 text-blue-600">
                  {status}
                </p>
              </td>
              <td>{formatDate(createdAt)}</td>
              <td className="flex gap-2">
                <button className="h-8 w-8 rounded-lg transition-colors dark:hover:bg-stone-800 dark:focus:bg-stone-900">
                  <MdOutlineSettings className="h-6 w-6" />
                </button>
                <button
                  className="h-8 w-8 rounded-lg transition-colors dark:hover:bg-stone-800 dark:focus:bg-stone-900"
                  onClick={() => setOrderCodeToDelete(code)}
                >
                  <MdDeleteOutline className="h-6 w-6" />
                </button>
              </td>
            </tr>
          );
        });
    }
  };

  return (
    <div
      id="dashbarod-orders"
      className="flex w-full grow flex-col justify-between overflow-y-hidden px-6 pt-3"
    >
      <section className="flex grow flex-col overflow-hidden">
        <DashboardHeader label="Commandes" noPadding />
        <div
          id="orders-toolbar"
          className="flex h-16 min-h-[4rem] w-full items-center justify-end "
        >
          <DashboardSearchInput placeholder="Cherche une commande" />
        </div>
        <div
          id="table-container"
          className="flex overflow-auto w-full dark:[color-scheme:dark]"
        >
          <table className="table-fixed text-left text-sm w-full">
            <thead>
              <tr className="h-14 sticky top-0 z-10 dark:bg-dark  text-stone-500">
                <th className="w-28 pl-4">#</th>
                <th className="w-36">Telephone</th>
                <th className="w-28">Wilaya</th>
                <th className="w-64">Adresse</th>
                <th className="w-64 2xl:w-72">Produits</th>
                <th className="w-28">Prix Total</th>
                <th className="w-32">Statut</th>
                <th className="w-44">Date</th>
                <th className="w-auto">Actions</th>
              </tr>
            </thead>
            <tbody className="relative text-stone-50">{displayData()}</tbody>
          </table>
        </div>
        <div
          id={portalTargetElementId}
          className="grow w-full  flex justify-center items-center"
        ></div>
      </section>
      <section
        id="pagination"
        className="h-10 min-h-[2.5rem] bg-blue-400 w-full"
      >
        test
      </section>
      {orderCodeToDelete && (
        <DashboardDeleteConfirm
          label="Supprimer une commande"
          text="Êtes-vous sûr de vouloir supprimer cette commande"
          closeModal={() => setOrderCodeToDelete(null)}
          isLoading={isDeleting}
          onConfirm={() => deleteMutation(orderCodeToDelete)}
        />
      )}
    </div>
  );
}
