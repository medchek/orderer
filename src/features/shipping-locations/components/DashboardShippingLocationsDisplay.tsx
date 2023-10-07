"use client";

import { useState, type ReactNode, useEffect } from "react";
import { useStore } from "@/store";

import ModalLoader from "@/components/ModalLoader";
import dynamic from "next/dynamic";
import { useGetLocations } from "../api/getLocations";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import { MdLocationOn } from "react-icons/md";
import DashboardShippingLocationsCard from "./DashboardShippingLocationsCard";
import DashboardPagination from "@/components/dashboard/DashboardPagination";
import DashboardShippingLocationsCardLoader from "./DashboardShippingLocationsCardLoader";

const DashboardUpdateShippingLocation = dynamic(
  () => import("./DashboardUpdateShippingLocation"),
  { loading: () => <ModalLoader /> },
);
const DashboardDeleteShippingLocation = dynamic(
  () => import("./DashboardDeleteShippingLocation"),
  { loading: () => <ModalLoader /> },
);
const DashboardAddShippingLocation = dynamic(
  () => import("./DashboardAddShippingLocation"),
  { loading: () => <ModalLoader /> },
);

export default function DashboardShippingLocationsDisplay() {
  const {
    isShippingLocationModalOpen,
    setIsShippingLocationModalOpen,
    shippingLocationsQueryFilters,
    setShippingLocationsQueryFilters,
    setShippingLocationsCurrentPage,
  } = useStore();

  const { isFetching, isError, isSuccess, data, refetch } = useGetLocations(
    shippingLocationsQueryFilters,
  );

  /**
   * PAGINATION
   */

  const productsPerPage = 15;
  const pageCount = Math.ceil((data?.count ?? 0) / productsPerPage);
  const handlePageChange = (event: { selected: number }) => {
    const selected = event.selected;
    const currentPage = shippingLocationsQueryFilters.currentPage;
    if (selected === currentPage) return;
    setShippingLocationsCurrentPage(selected);
  };

  const [locationIndexToDelete, setLocationIndexToDelete] = useState<
    number | null
  >(null);
  const [locationIndexToUpdate, setLocationIndexToUpdate] = useState<
    number | null
  >(null);

  const [hasFilters, setHasFilters] = useState(false);
  useEffect(() => {
    setHasFilters(Object.keys(shippingLocationsQueryFilters).length > 1);
  }, [shippingLocationsQueryFilters]);

  const resetFilters = () => {
    setShippingLocationsQueryFilters({ currentPage: 0 });
  };

  const displayData = (): ReactNode | ReactNode[] => {
    if (data) {
      const { data: shippingLocations } = data;
      if (shippingLocations.length > 0) {
        return shippingLocations.map((location, i) => (
          <DashboardShippingLocationsCard
            key={location.id}
            {...location}
            onDeleteClick={() => {
              setLocationIndexToDelete(i);
              // close the update modal in case it's opened
              setLocationIndexToUpdate(null);
            }}
            onEditClick={() => {
              // close the delete modal in case it's opened
              setLocationIndexToDelete(null);
              setLocationIndexToUpdate(i);
            }}
          />
        ));
      } else {
        return (
          <DashboardEmptyState
            className="absolute"
            text={
              hasFilters
                ? "Aucun point de livraison ne corresponds au filtres appliqués"
                : "Aucun point de livraison n'a été ajouté"
            }
            Icon={<MdLocationOn className="h-14 w-14" />}
            subContent={
              hasFilters ? "Réinitialiser les filtres" : "Ajouter un point"
            }
            subContentAction={() => {
              if (hasFilters) resetFilters();
              else setIsShippingLocationModalOpen(true);
            }}
            actionButtonIcon={!hasFilters}
          />
        );
      }
    }
    return null;
  };

  return (
    <div className="relative flex h-full w-full grow flex-col justify-between overflow-hidden">
      {/* <div className="mr-6 flex w-full flex-col gap-2 overflow-y-auto pr-6 dark:[color-scheme:dark]"> */}
      <div className="mr-6 grid w-full gap-2 overflow-y-auto pr-6 dark:[color-scheme:dark] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {isError && <DashboardFetchError refetch={refetch} />}
        {isFetching &&
          Array.from({ length: 10 }, (_, i) => (
            <DashboardShippingLocationsCardLoader key={i} />
          ))}

        {isSuccess && !isFetching && displayData()}
      </div>

      <DashboardPagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />

      {isShippingLocationModalOpen && <DashboardAddShippingLocation />}

      {locationIndexToDelete !== null && (
        <DashboardDeleteShippingLocation
          locationIndex={locationIndexToDelete}
          closeModal={() => setLocationIndexToDelete(null)}
        />
      )}

      {locationIndexToUpdate !== null && (
        <DashboardUpdateShippingLocation
          onCloseModal={() => setLocationIndexToUpdate(null)}
          locationIndex={locationIndexToUpdate}
        />
      )}
    </div>
  );
}
