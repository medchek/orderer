import React from "react";
import DashboardShippingLocationsFormModal from "./DashboardShippingLocationsFormModal";
import { useStore } from "@/store";
import { ShippingLocationsSubmitData } from "../types";
import { usePostShippingLocation } from "../api/postLocation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function DashboardAddShippingLocation() {
  const queryClient = useQueryClient();
  const {
    setIsShippingLocationModalOpen,
    showSnackbar,
    shippingLocationsQueryFilters,
  } = useStore();

  const { isLoading, mutate: postLocation } = usePostShippingLocation({
    onError: () => {
      showSnackbar("Une erreur est survenu, veuillez reéssayer", "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.locations.all(shippingLocationsQueryFilters)
          .queryKey,
      });
      showSnackbar("Point de livraison ajouté avec succès", "default");
      setIsShippingLocationModalOpen(false);
    },
  });

  const handleOnSubmit = (data: ShippingLocationsSubmitData) => {
    console.log(data);
    postLocation(data);
  };

  return (
    <DashboardShippingLocationsFormModal
      isLoading={isLoading}
      onSubmit={handleOnSubmit}
    />
  );
}
