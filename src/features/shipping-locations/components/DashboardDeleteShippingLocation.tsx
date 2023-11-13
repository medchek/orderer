import DashboardDeleteConfirm from "@/components/dashboard/DashboardDeleteConfirm";
import React from "react";
import { useDeleteLocation } from "../api/deleteLocation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useGetLocations } from "../api/getLocations";
import { useStore } from "@/store";

interface Props {
  closeModal: () => void;
  /** The index of the shipping location within the query data array */
  locationIndex: number;
}

export default function DashboardDeleteShippingLocation({
  closeModal,
  locationIndex,
}: Props) {
  const queryClient = useQueryClient();
  const { showSnackbar, shippingLocationsQueryFilters } = useStore();
  const { isPending, mutate: deleteLocation } = useDeleteLocation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.locations.all(shippingLocationsQueryFilters)
          .queryKey,
      });
      closeModal();
      showSnackbar("Point de livraison supprimé");
    },
    onError: () => {
      showSnackbar(
        "Une érreur est survenu lors la suppression, veuillez reéssayer",
        "error",
      );
    },
  });

  const { data: locationsData } = useGetLocations(
    shippingLocationsQueryFilters,
  );

  const targetLocation = locationsData?.data[locationIndex];

  const handleOnConfirm = () => {
    if (targetLocation) {
      deleteLocation(targetLocation.id);
    }
  };
  return (
    <DashboardDeleteConfirm
      closeModal={closeModal}
      label="Supprimer un point de livraison"
      onConfirm={handleOnConfirm}
      isLoading={isPending}
      text="Êtes-vous sûr de vouloir supprimer ce point de livraison"
    />
  );
}
