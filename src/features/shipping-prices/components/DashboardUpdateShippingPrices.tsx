"use client";
import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { addPartitive, toPositiveNumber } from "@/lib/utils";
import { useStore } from "@/store";

import SwitchButton from "@/components/SwitchButton";
import { Wilaya } from "@/store/wilayaSlice";
import { useQueryClient } from "@tanstack/react-query";
import { klona } from "klona/json";
import { queryKeys } from "@/lib/queryKeys";
import {
  PatchShippingPricesRequestPayload,
  usePatchShippingPrices,
} from "../api/patchWilaya";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { WilayasSelection } from "../types";
import ModalActionButtons from "@/components/ModalActionButtons";

export interface SelectedWilaya extends Wilaya {
  index: number;
}

interface Props {
  closeModal: () => void;
  /**
   * A single wilaya to be updated
   */
  selectedWilaya: SelectedWilaya | null;
  /**
   * A list of selected wilayas to be updated
   */
  selectedMultiple: WilayasSelection;
  // selectedWilayaIndex: number | null;
}

interface UpdateShippingPricesFormValues {
  homePrice: string;
  officePrice: string;
}

export default function DashboardUpdateShippingPrices({
  closeModal,
  selectedWilaya,
  selectedMultiple,
}: // selectedWilayaIndex,
Props) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useStore();
  const methods = useForm<UpdateShippingPricesFormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [isAvailableHome, setIsAvailableHome] = useState<boolean>(
    selectedWilaya === null ? true : selectedWilaya.availableHome,
  );
  const [isAvailableOffice, setIsAvailableOffice] = useState<boolean>(
    selectedWilaya === null ? true : selectedWilaya.availableOffice,
  );

  const { mutate: patchWilaya, isPending } = usePatchShippingPrices({
    onSuccess: (data) => {
      const wilayasData = queryClient.getQueryData<Wilaya[]>(
        queryKeys.wilayas.all.queryKey,
      );

      if (!wilayasData) return;
      const wilayasDataCopy = klona(wilayasData);
      const { wilayas } = data;
      // go through each wilaya to be modifed
      wilayas.forEach((code) => {
        const targetWilaya = wilayasDataCopy[code - 1];
        // if (wilayaIndex < 0) return;
        if (data.availableHome !== undefined) {
          targetWilaya.availableHome = data.availableHome;
        }
        if (data.availableOffice !== undefined) {
          targetWilaya.availableOffice = data.availableOffice;
        }
        if (data.homePrice !== undefined) {
          targetWilaya.homePrice = data.homePrice;
        }
        if (data.officePrice !== undefined) {
          targetWilaya.officePrice = data.officePrice;
        }
      });

      queryClient.setQueryData(queryKeys.wilayas.all.queryKey, wilayasDataCopy);
      closeModal();
      showSnackbar(
        selectedWilaya !== null
          ? `Wilaya modifiée avec succès`
          : "Wilayas modifiées avec succès",
      );
    },
    onError: () => {
      showSnackbar("Une erreur est survenu, veuillez réessayer", "error");
    },
  });

  useEffect(() => {
    if (selectedWilaya) {
      setIsAvailableHome(selectedWilaya.availableHome);
      setIsAvailableOffice(selectedWilaya.availableOffice);
    }
  }, [selectedWilaya]);
  const displayWilayaName = () => {
    const name = selectedWilaya?.name;
    // if it's null, then, only a single wilaya is requested to be modified
    if (name) {
      return `de la wilaya ${addPartitive(name)}`;
    } else {
      return "des wilayas sélectionnées";
    }
  };

  const validatePriceInput = (v: string) => {
    const value = v.trim();
    if (value.length) {
      const isValidNumber = /^\d+(\.\d{1,2})?$/gi.test(value);
      if (!isValidNumber) return "Vous devez choisir un prix valide";
    }
  };

  const onFormSubmit: SubmitHandler<UpdateShippingPricesFormValues> = async (
    data,
    e,
  ) => {
    e?.preventDefault();
    // if only a single wilaya is selected, check if anything changed
    const requestBody: PatchShippingPricesRequestPayload = {
      wilayas: [],
    };
    if (selectedWilaya) {
      if (toPositiveNumber(data.homePrice) != selectedWilaya.homePrice) {
        requestBody.homePrice = toPositiveNumber(data.homePrice);
      }

      if (toPositiveNumber(data.officePrice) != selectedWilaya.officePrice) {
        requestBody.officePrice = toPositiveNumber(data.officePrice);
      }
      if (isAvailableHome != selectedWilaya.availableHome) {
        requestBody.availableHome = isAvailableHome;
      }
      if (isAvailableOffice != selectedWilaya.availableOffice) {
        requestBody.availableOffice = isAvailableOffice;
      }
      // if there is nothing to update show info snack
      if (Object.keys(requestBody).length === 1) {
        return showSnackbar("Aucune modification n'a été apportée", "default");
      }

      requestBody.wilayas = [selectedWilaya.code];
      // Object.assign(requestBody, updatedValues);
      // console.log("request body =>", requestBody);
    } else {
      // Mutliple wilaya handling
      const { homePrice: rawHomePrice, officePrice: rawOfficePrice } = data;
      const homePrice = rawHomePrice.trim();
      const officePrice = rawOfficePrice.trim();
      // if all the available state isn't the same as when the component got created
      const isAvailableHomeChanged = selectedMultiple.some(
        (w) => w.availableHome !== isAvailableHome,
      );
      const isAvailableOfficeChanged = selectedMultiple.some(
        (w) => w.availableOffice !== isAvailableOffice,
      );
      if (!isAvailableHomeChanged && !isAvailableOfficeChanged) {
        return showSnackbar("Aucune modification n'a été apportée", "default");
      }
      requestBody.wilayas = selectedMultiple.map(({ code }) => code);
      if (homePrice) requestBody.homePrice = toPositiveNumber(homePrice);
      if (officePrice) requestBody.officePrice = toPositiveNumber(officePrice);
      if (isAvailableHomeChanged) requestBody.availableHome = isAvailableHome;
      if (isAvailableOfficeChanged)
        requestBody.availableOffice = isAvailableOffice;

      // console.log("Multiple request body", requestBody);
    }
    patchWilaya(requestBody);
  };
  return (
    <Modal
      closeModal={closeModal}
      label="Prix de livraisons"
      className="flex w-full flex-col rounded-lg bg-[#F3F3F3] px-6 py-3 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      closeOnClickOutside
      centerModalContent
      preventClose={isPending}
    >
      <form
        className="w-full px-2"
        onSubmit={handleSubmit(onFormSubmit, (err) => {
          console.error("Error submitting update product form:", err);
        })}
      >
        <p className="mb-3 text-sm text-stone-400">
          Modifier les prix de livraison et la disponibilité
          {displayWilayaName()}.
        </p>

        <section className="flex w-full gap-4">
          <Input
            type="number"
            label="Livraison à domicile"
            placeholder="Prix de livraison à domicile"
            name="homePrice"
            min={0}
            register={register}
            registerRules={{
              min: 0,
              validate: validatePriceInput,
            }}
            defaultValue={selectedWilaya?.homePrice}
            error={errors["homePrice"]?.message}
          />
          <Input
            type="number"
            label="Livraison au bureau"
            placeholder="Prix de livraison au bureau"
            name="officePrice"
            register={register}
            min={0}
            registerRules={{
              min: 0,
              validate: validatePriceInput,
            }}
            defaultValue={selectedWilaya?.officePrice}
            error={errors["officePrice"]?.message}
          />
        </section>
        <section className="flex w-full gap-4 text-neutral-900 dark:text-stone-100">
          <div className="flex w-full flex-col">
            <p className="font-semibold">Disponibilité</p>
            <div className="flex h-12 items-center justify-between pr-2">
              <p className="text-sm text-stone-400">
                Render la wilaya disponible ou non disponible pour livraison à
                domicile
              </p>

              <SwitchButton
                isActive={isAvailableHome}
                onClick={() => setIsAvailableHome(!isAvailableHome)}
              />
            </div>
          </div>

          <div className="flex w-full flex-col">
            <p className="font-semibold">Disponibilité</p>
            <div className="flex h-12 items-center justify-between pr-2">
              <p className="text-sm text-stone-400">
                Render la wilaya disponible ou non disponible pour livraison au
                bureau
              </p>
              <SwitchButton
                isActive={isAvailableOffice}
                onClick={() => setIsAvailableOffice(!isAvailableOffice)}
              />
            </div>
          </div>
        </section>

        <ModalActionButtons
          onCancel={closeModal}
          confirmButtonType="submit"
          isLoading={isPending}
          confirmText="Modifier"
        />
      </form>
    </Modal>
  );
}
