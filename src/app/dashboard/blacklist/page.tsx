"use client";
import ModalLoader from "@/components/ModalLoader";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";
import DashboardToolbarAddButton from "@/components/dashboard/DashboardToolbarAddButton";
import { useDeleteBlacklistedNumber } from "@/features/blacklist/api/deleteBlacklist";
import { useFetchBlacklist } from "@/features/blacklist/api/getBlacklist";
import DashboardBlacklistedUserCard from "@/features/blacklist/components/DashboardBlacklistedUserCard";
import { queryKeys } from "@/lib/queryKeys";
import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

import dynamic from "next/dynamic";

const DashboardOrdersBlockUser = dynamic(
  () => import("@/features/orders/components/DashboardOrdersBlockUser"),
  { loading: () => <ModalLoader /> },
);

const DeleteBlacklistedNumberConfirm = dynamic(
  () => import("@/components/dashboard/DashboardDeleteConfirm"),
  { loading: () => <ModalLoader /> },
);

import React, { useState } from "react";
import { BsPersonSlash } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

export default function Blacklist() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, refetch } = useFetchBlacklist();
  const {
    showSnackbar,
    blacklistedNumberIdToDelete,
    setBlacklistedNumberIdToDelete,
  } = useStore();

  const [isAddingNumberToBlock, setIsAddingNumberToBlock] = useState(false);

  const openAddNumberToBlock = () => {
    // close the delete modal in case it's opened
    setBlacklistedNumberIdToDelete(null);
    setIsAddingNumberToBlock(true);
  };

  const { mutate: deleteBlacklistMutation, isPending: isDeleting } =
    useDeleteBlacklistedNumber({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.orders._def });
        queryClient.invalidateQueries({ queryKey: queryKeys.blacklist._def });
        // close modal
        setBlacklistedNumberIdToDelete(null);
        showSnackbar("Numéro retiré  de liste noire", "default");
      },
      onError: () => {
        showSnackbar(
          "Une érreur est survenu lors la suppression, veuillez reéssayer",
          "error",
        );
      },
    });

  const [searchTerm, setSearchTerm] = useState("");

  const displayData = () => {
    if (data) {
      if (!data.length) {
        return (
          <DashboardEmptyState
            className="absolute left-0 top-0"
            text="Aucun numéro n'a encore été ajouté à la liste noire."
            subContent={
              <button
                type="button"
                className="h-10 rounded-lg  px-2 font-semibold transition-colors dark:hover:bg-neutral-900 dark:focus:bg-neutral-900/70"
                onClick={openAddNumberToBlock}
              >
                <MdAdd className="h-7 w-7" /> Ajouter un numéro
              </button>
            }
            Icon={<BsPersonSlash className="h-12 w-12" />}
          />
        );
      } else {
        const filterRegex = /^[\d]{2,10}$/gi;
        const filteredData =
          // only apply search filter if it matches the regex
          filterRegex.test(searchTerm)
            ? data.filter(({ phone }) => phone.includes(searchTerm))
            : data;

        if (!filteredData.length) {
          return (
            <DashboardEmptyState
              Icon={<BsPersonSlash className="h-12 w-12" />}
              text="Aucun numéro ne correspond à votre recherche"
              className="absolute left-0 top-0"
            />
          );
        } else {
          return data.map((user) => (
            <DashboardBlacklistedUserCard key={user.id} user={user} />
          ));
        }
      }
    }
  };

  return (
    <div
      id="blacklist"
      className="flex w-full grow flex-col overflow-y-hidden px-6 py-3 dark:[color-scheme:dark]"
    >
      <DashboardHeader label="Liste noire" noPadding />
      <div
        id="blacklist-toolbar"
        className="flex h-16 min-h-[4rem] w-full items-center justify-between "
      >
        <DashboardToolbarAddButton
          onClick={openAddNumberToBlock}
          text="Ajouter un numéro"
        />

        <DashboardSearchInput
          placeholder="Chercher un numéro"
          onChange={(e) => {
            setSearchTerm(e.target.value.trim());
          }}
          maxLength={10}
        />
      </div>

      <section className="relative w-full grow overflow-y-auto text-neutral-50">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {isError && (
            <DashboardFetchError
              refetch={refetch}
              text="Une érreur est survenur lors de la recherche des numéros bloqués"
            />
          )}
          {isPending &&
            // Skeletons
            Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="flex h-28 animate-pulse grid-flow-row-dense justify-between rounded-lg bg-neutral-950 p-4"
              >
                <div className="flex w-10/12 flex-col gap-2 [&>div]:rounded-md [&>div]:bg-neutral-800">
                  <div className="h-6 w-full"></div>
                  <div className="h-5 w-1/4"></div>
                  <div className="h-5 w-3/5"></div>
                </div>
                <div className="h-8 w-8 rounded-md bg-neutral-800"></div>
              </div>
            ))}

          {displayData()}
        </div>
      </section>

      {isAddingNumberToBlock && (
        <DashboardOrdersBlockUser
          closeModal={() => setIsAddingNumberToBlock(false)}
        />
      )}
      {blacklistedNumberIdToDelete && (
        <DeleteBlacklistedNumberConfirm
          onConfirm={() => {
            deleteBlacklistMutation(blacklistedNumberIdToDelete);
          }}
          closeModal={() => {
            setBlacklistedNumberIdToDelete(null);
          }}
          isLoading={isDeleting}
          text={`Vous êtes sur le point de retirer ce numéro de la liste noire, veuillez confirmer votre action.`}
          label="Retier de la liste noir"
          confirmButtonText="Retirer"
        />
      )}
    </div>
  );
}
