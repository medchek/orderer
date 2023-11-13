import React from "react";
import DashboardShippingLocationsFormModal from "./DashboardShippingLocationsFormModal";
import { PatchLocationPayload, usePatchLocation } from "../api/patchLocation";
import { ShippingLocationsSubmitData } from "../types";
import { useGetLocations } from "../api/getLocations";
import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

interface Props {
  locationIndex: number;
  /** Function to run when closing the form modal */
  onCloseModal: () => void;
}

export default function DashboardUpdateShippingLocation({
  onCloseModal,
  locationIndex,
}: Props) {
  const queryClient = useQueryClient();
  const {
    showSnackbar,
    selectedWilaya,
    setIsShippingLocationModalOpen,
    setSelectedWilaya,
    setSelectedTown,
    // query filters
    shippingLocationsQueryFilters,
  } = useStore();
  const { data: locationData } = useGetLocations(shippingLocationsQueryFilters);
  const targetLocation = locationData?.data[locationIndex];

  const { isPending, mutate: patchLocation } = usePatchLocation({
    onError: () => {
      showSnackbar("Une érreur est survenu, veuillez reéssayer");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.locations.all(shippingLocationsQueryFilters)
          .queryKey,
      });

      showSnackbar("Point de livraison modifié avec succès");
      onCloseModal();
      setIsShippingLocationModalOpen(false);
      setSelectedWilaya(null);
      setSelectedTown(null);
    },
  });

  const handleOnSubmit = (data: ShippingLocationsSubmitData) => {
    if (!targetLocation) return;
    const { name, town, wilaya, additionalCosts, coordinates } = data;
    const patchPayload: PatchLocationPayload = {};

    if (targetLocation.name !== name) {
      patchPayload.name = name;
    }
    if (targetLocation.wilaya.code !== wilaya) {
      patchPayload.wilaya = wilaya;
    }
    if (targetLocation.town.code !== town) {
      patchPayload.town = town;
    }

    if (targetLocation.coordinates !== coordinates) {
      patchPayload.coordinates = coordinates;
    }

    if (targetLocation.additionalCosts !== additionalCosts) {
      patchPayload.additionalCosts = additionalCosts;
    }

    if (Object.keys(patchPayload).length > 0) {
      patchLocation({
        id: targetLocation.id,
        data: patchPayload,
      });
    }
  };
  return (
    <DashboardShippingLocationsFormModal
      onCloseModal={onCloseModal}
      isLoading={isPending}
      onSubmit={handleOnSubmit}
      locationData={targetLocation}
      disableSubmit={!selectedWilaya}
    />
  );
}
