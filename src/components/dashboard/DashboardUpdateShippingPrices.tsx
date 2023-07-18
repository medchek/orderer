"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { WilayaWithAvailability } from "@/store/wilayaSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { toNumber } from "@/lib/utils";
import { useStore } from "@/store";
import { PatchShippingPricesRequestPayload } from "@/types/api";

import Loader from "../Loader";
import { STATUS_OK } from "@/lib/constants";

export type MultipleWilayaSelection = {
  code: number;
  selected: boolean;
  available: boolean;
  index: number;
}[];

export interface SelectedWilaya extends WilayaWithAvailability {
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
  selectedMultiple: MultipleWilayaSelection;
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
  const { showSnackbar, updateWilaya } = useStore();
  const methods = useForm<UpdateShippingPricesFormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [isAvailable, setIsAvailable] = useState<boolean>(
    selectedWilaya === null ? true : selectedWilaya.available
  );

  useEffect(() => {
    if (selectedWilaya) {
      setIsAvailable(selectedWilaya.available);
    } else {
      const allAvailable = selectedMultiple.every((w) => w.available === true);
      const allNotAvailable = selectedMultiple.every(
        (w) => w.available === false
      );

      if (allAvailable) {
        setIsAvailable(true);
      } else if (allNotAvailable) {
        setIsAvailable(false);
      } else {
        setIsAvailable(true);
      }
    }
  }, []);
  const displayWilayaName = () => {
    const name = selectedWilaya?.name;
    if (name) {
      let wilayaNameDisplay = `de ${name}`;
      const startsWithVowel =
        /^[aieouâêîôûäëïöüàéèùœAIEOUÂÊÎÔÛÄËÏÖÜÀÉÈÙŒ]/.test(name[0]);
      if (startsWithVowel) {
        wilayaNameDisplay = `d'${name}`;
      }
      return `de la wilaya ${wilayaNameDisplay}`;
    } else {
      return "des wilayas séléctionnées";
    }
  };

  const validatePriceInput = (v: string) => {
    const value = v.trim();
    if (value.length) {
      const isValidNumber = /^\d+(\.\d{1,2})?$/gi.test(value);
      if (!isValidNumber) return "Vous devez choisir un prix valide";
    }
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onFormSubmit: SubmitHandler<UpdateShippingPricesFormValues> = async (
    data,
    e
  ) => {
    e?.preventDefault();
    // if only a single wilaya is selected, check if anything changed
    const requestBody: PatchShippingPricesRequestPayload = {
      wilayas: [],
    };
    if (selectedWilaya) {
      const updatedValues = {
        // add the property if it's not empty and the new value is not equal to the current one
        ...(data.homePrice &&
          toNumber(data.homePrice) !== selectedWilaya.homePrice && {
            homePrice: toNumber(data.homePrice),
          }),
        ...(data.officePrice &&
          toNumber(data.officePrice) !== selectedWilaya.officePrice && {
            officePrice: toNumber(data.officePrice),
          }),
        ...(isAvailable !== selectedWilaya.available && {
          available: isAvailable,
        }),
      };

      // if there is nothing to update show info snack
      if (!Object.keys(updatedValues).length) {
        return showSnackbar("Aucune modification n'a été apportée", "default");
      }

      requestBody.wilayas = [selectedWilaya.code];
      Object.assign(requestBody, updatedValues);
      console.log("request body =>", requestBody);
    } else {
      // Mutliple wilaya handling
      const { homePrice: rawHomePrice, officePrice: rawOfficePrice } = data;
      const homePrice = rawHomePrice.trim();
      const officePrice = rawOfficePrice.trim();
      // if all the available state isn't the same as when the component got created
      const isAvailableChanged = selectedMultiple.every(
        (w) => w.available !== isAvailable
      );
      if (!homePrice && !officePrice && !isAvailableChanged) {
        return showSnackbar("Aucune modification n'a été apportée", "default");
      }
      requestBody.wilayas = selectedMultiple.map(({ code }) => code);
      if (homePrice.length) requestBody.homePrice = toNumber(homePrice);
      if (officePrice.length) requestBody.officePrice = toNumber(officePrice);
      if (isAvailableChanged) requestBody.available = isAvailable;

      console.log("Multiple request body", requestBody);
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/wilayas", {
        method: "PATCH",
        body: JSON.stringify(requestBody),
      });

      if (response.status === STATUS_OK) {
        showSnackbar(
          selectedWilaya !== null
            ? `Wilaya modifiée avec succès`
            : "Wilayas modifiées avec succès"
        );
        // update the state as well, since no data is recived by the server
        const { wilayas, ...updateData } = requestBody;
        if (selectedWilaya) {
          updateWilaya({ ...updateData, index: selectedWilaya.index });
        } else {
          selectedMultiple.forEach(({ index }) => {
            updateWilaya({ ...updateData, index });
          });
        }
        closeModal();
      } else {
        throw `Error of type ${response.status}`;
      }
    } catch (error) {
      showSnackbar("Une érreur est survenu, veuillez réessayer", "error");
      console.log("Error updating wilaya shipping prices", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Modal
      closeModal={closeModal}
      label="Modifier prix de livraison"
      className="flex w-full flex-col rounded-lg  bg-[#F3F3F3] px-6 py-3 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      closeOnClickOutside
      centerModalContent
    >
      <form
        className="w-full px-2"
        onSubmit={handleSubmit(onFormSubmit, (err) => {
          console.error("Error submitting update product form:", err);
        })}
      >
        <p className="mb-3 text-sm text-stone-400">
          Modifier les prix de livraison {displayWilayaName()}.
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
        <section className="w-1/2">
          <div className="mb-1 flex w-full flex-col text-white">
            <p className="mb-1 text-lg font-semibold dark:text-stone-100">
              Disponibilité
            </p>
            <div className="flex h-10 items-center justify-between pr-2">
              <p className="text-sm text-stone-200">
                Rendre la wilaya disponible ou non disponible pour livraison
              </p>

              <button
                type="button"
                id="switch"
                className={`relative flex h-7 w-14 items-center  rounded-full  px-1 ${
                  isAvailable
                    ? "justify-end bg-secondary"
                    : "justify-start bg-stone-700"
                }`}
                onClick={() => setIsAvailable(!isAvailable)}
              >
                <span
                  className={`inline-block h-6 w-6 rounded-full  ${
                    isAvailable ? "bg-white" : "bg-stone-300"
                  } `}
                ></span>
              </button>
            </div>
          </div>
        </section>

        <section
          id="form-buttons"
          className="flex items-center justify-end gap-4 py-4"
        >
          <button
            type="button"
            className="h-10 w-36 rounded-md font-bold transition-colors dark:bg-white/10 dark:text-stone-400 dark:hover:bg-white/[0.15] dark:focus:bg-white/5"
            onClick={closeModal}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="h-10 w-36 rounded-md bg-blue-600 font-bold text-white transition-colors hover:bg-secondary focus:bg-blue-700  disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-400 disabled:dark:bg-stone-600"
            // onClick={handleDeleteProduct}
            // disabled
            // disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader className="h-6 w-6" />
            ) : (
              <span>Modifier</span>
            )}
          </button>
        </section>
      </form>
    </Modal>
  );
}