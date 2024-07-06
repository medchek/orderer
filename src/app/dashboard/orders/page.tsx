"use client";

import ModalLoader from "@/components/ModalLoader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";
import { BsListNested } from "react-icons/bs";
import { useStore } from "@/store";
import DashboardOrdersCard from "@/features/orders/components/DashboardOrdersCard";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import DashboardPagination from "@/components/dashboard/DashboardPagination";

import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import DashboardOrdersBlockPhone from "@/features/orders/components/DashboardOrdersBlockPhone";
import DashboardOrdersToolbar from "@/features/orders/components/DashboardOrdersToolbar";
import { useGetOrders } from "@/features/orders/api/getOrders";
import { useDeleteOrder } from "@/features/orders/api/deleteOrder";
import { usePatchOrder } from "@/features/orders/api/patchOrder";
import { queryKeys } from "@/lib/queryKeys";

const DashboardDeleteConfirm = dynamic(
  () => import("@/components/dashboard/DashboardDeleteConfirm"),
  { loading: () => <ModalLoader /> },
);

export default function Orders() {
  const queryClient = useQueryClient();
  const {
    showSnackbar,
    orderPhoneToBlock,
    setOrderCodeToDelete,
    orderCodeToDelete,
    setOrderPhoneToBlock,
    ordersQueryFilters,
    ordersQueryFilters: { currentPage },
    setOrdersCurrentPage: setCurrentPage,
  } = useStore();

  const {
    isFetching,
    isError: isFetchingOrderError,
    data: ordersData,
    refetch,
  } = useGetOrders({
    filters: ordersQueryFilters,
  });

  // pagination
  const ordersPerPage = 10;
  const pageCount = Math.ceil((ordersData?.count ?? 0) / ordersPerPage);

  const handlePageChange = (event: { selected: number }) => {
    const selected = event.selected;
    if (selected === currentPage) return;
    setCurrentPage(selected);
  };

  const { mutate: deleteMutation, isPending: isDeleting } = useDeleteOrder({
    onSuccess: (deletedOrderCode) => {
      if (!ordersData) return;
      const ordersDataCopy = ordersData.data.filter(
        (order) => order.code !== deletedOrderCode,
      );
      queryClient.setQueryData(
        queryKeys.orders.all(ordersQueryFilters).queryKey,
        {
          count: ordersData.count,
          data: ordersDataCopy,
        },
      );
      // queryClient.invalidateQueries({queryKey: ["orders"]})
      showSnackbar("Commande supprimée", "default");
      // close the modal
      setOrderCodeToDelete(null);
    },
    onError: () => {
      showSnackbar("Une erreur est survenu, veuillez reéssayer", "error");
    },
  });

  const {
    mutateAsync: patchMutation,
    isPending: isPatching,
    variables: patchData,
  } = usePatchOrder({
    onSuccess() {
      // close modal
      setOrderPhoneToBlock(null);
      queryClient.invalidateQueries({ queryKey: queryKeys.orders._def });
      showSnackbar("Commande Modifiée", "default");
    },
    onError: () => {
      showSnackbar("Une erreur est survenu, veuillez reéssayer", "error");
    },
  });

  const displayOrdersData = () => {
    if (isFetching) {
      // SKELETON LOADERS
      return Array.from({ length: 8 }, (_, i) => (
        <div
          key={`tr-${i}`}
          className="h-auto animate-pulse space-y-2 rounded-md bg-neutral-900/80 px-4 py-3 [&>section>div]:rounded-md [&>section>div]:bg-neutral-800"
        >
          <section className="flex gap-2 [&>div]:h-6">
            <div className="w-1/6"></div>
            <div className="h-6 w-1/12"></div>
            <div className="h-6 w-20"></div>
          </section>
          <section className="flex gap-2 [&>div]:h-5">
            <div className="w-24"></div>
            <div className="w-20"></div>
            <div className="w-72"></div>
            <div className="w-32"></div>
          </section>
          <hr className="border-neutral-800" />
          <section className="flex justify-between">
            <div className="h-6 w-72"></div>
            <section className="flex flex-col items-end gap-2">
              <div className="h-4 w-40 rounded-md bg-neutral-800"></div>
              <div className="h-6 w-44 rounded-md bg-neutral-800"></div>
            </section>
          </section>
        </div>
      ));
    } else if (isFetchingOrderError) {
      return (
        <DashboardFetchError
          refetch={refetch}
          text="Une érreur s'est produite lors de la recherche des commandes"
          className="relative flex h-full justify-center"
        />
      );
    } else {
      // no data
      if (!ordersData || ordersData.data.length === 0) {
        const hasFilter = !!Object.entries(ordersQueryFilters).filter(
          ([_, value]) => !!value,
        ).length;
        return (
          <DashboardEmptyState
            Icon={<BsListNested className="h-20 w-20" />}
            text={
              hasFilter
                ? "Commandes non trouvées"
                : "Aucune commande n'a été encore enregistrée"
            }
            subContent={
              hasFilter
                ? "Aucune commande ne corresponds à la recherche ou au filtres séléctionés."
                : "Vous serez informé via notifications chaque fois qu'une nouvelle commande est enregistrée"
            }
          />
        );
      }
      // DATA Display
      else
        return ordersData.data.map((order) => {
          const { code } = order;

          return (
            <DashboardOrdersCard
              key={code}
              updateStatus={patchMutation}
              isPatching={isPatching}
              patchingCode={patchData?.code}
              {...order}
            />
          );
        });
    }
  };

  return (
    <div
      id="dashbarod-orders"
      className="flex w-full grow flex-col justify-between overflow-y-hidden pt-3"
    >
      <section className="flex grow flex-col overflow-hidden px-6">
        <DashboardHeader label="Commandes" noPadding />
        <DashboardOrdersToolbar />

        <div
          id="orders-list"
          className="flex w-full grow flex-col gap-4 overflow-y-auto dark:[color-scheme:dark]"
        >
          {displayOrdersData()}
        </div>
      </section>
      {/* <section
        id="pagination"
        className="h-10 min-h-[2.5rem] bg-blue-400 w-full"
      > */}
      <DashboardPagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
      {/* </section> */}
      {orderCodeToDelete && (
        <DashboardDeleteConfirm
          label="Supprimer une commande"
          text="Êtes-vous sûr de vouloir supprimer cette commande"
          closeModal={() => setOrderCodeToDelete(null)}
          isLoading={isDeleting}
          onConfirm={() => deleteMutation(orderCodeToDelete)}
        />
      )}
      {orderPhoneToBlock && (
        <DashboardOrdersBlockPhone
          phone={orderPhoneToBlock}
          closeModal={() => {
            setOrderPhoneToBlock(null);
          }}
        />
      )}
    </div>
  );
}

/**
 * TODO: Search by phone, id, wilaya, status, created
 *
 */
