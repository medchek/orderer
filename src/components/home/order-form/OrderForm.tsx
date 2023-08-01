"use client";

import React, { useEffect, useState } from "react";
import Input from "../../Input";
import WilayaSelectInput from "./WilayaSelectInput";
import ShippingTypeSelector from "./ShippingTypeSelector";

import {
  MdArrowBack,
  MdChevronRight,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { orderFormValidators } from "@/lib/formValidators";
import { useStore } from "@/store";
import Prices from "./Prices";
import OrderConfirm from "../OrderConfirm";
import { useMutation } from "@tanstack/react-query";
import { postOrder } from "@/lib/clientApiHelpers";
import { PostOrderRequestPayload } from "@/types/api";
import { toNumber } from "@/lib/utils";
import Loader from "@/components/Loader";
import { redirect, useRouter } from "next/navigation";

export interface OrderFormValues {
  lastName: string;
  name: string;
  phone: string;
  email: string;
  wilaya: string;
  address: string;
  isHome: boolean;
}

type Props = {};

export default function OrderForm({}: Props) {
  const { replace, prefetch } = useRouter();
  const methods = useForm<OrderFormValues>();

  useEffect(() => {
    prefetch("/thanks");
    return () => {
      // console.log("UNMOUNTED", isSuccess);
      // if (isSuccess) {
      removeAllSelectedProducts();
      setIsConfirming(false);
      // }
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const {
    selectedProducts,
    selectedWilaya,
    setConfirmData,
    confirmData,
    isConfirming,
    setIsConfirming,
    removeAllSelectedProducts,
  } = useStore();

  const isDisabledSubmit =
    selectedProducts.length === 0 || selectedWilaya === null;

  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (data: PostOrderRequestPayload) => {
      return postOrder(data);
    },
    onSuccess: ({ orderCode }) => {
      replace(`/thanks?code=${orderCode}`);
    },
  });

  const onFormSubmit: SubmitHandler<OrderFormValues> = async (data, e) => {
    e?.preventDefault();
    console.log("submitting");
    if (!isConfirming) {
      // confirmation step
      // mark the address as empty is the the shipping type is to the office
      const { isHome } = data;
      if (!isHome) {
        data.address = "";
      }
      setConfirmData(data);
      // show the confirm component
      setIsConfirming(true);
    } else {
      // if the user confirms the data
      const { address, email, isHome, lastName, name, phone, wilaya } = data;
      if (!selectedProducts.length) return;

      const requestData: PostOrderRequestPayload = {
        isHome,
        phone,
        productsCode: selectedProducts.map((p) => p.code),
        wilayaId: toNumber(wilaya),
        ...(email && { email }),
        ...(name && { name }),
        ...(lastName && { lastName }),
        ...(isHome && { address }),
      };
      // console.log("requretdata => ", requestData);
      mutate(requestData);
      // replace("/thanks?code=A5E5R8E6R9R5E2");
      // removeAllSelectedProducts();
      // setIsConfirming(false);
    }

    // console.log(data);
    // console.log(data);
  };

  const cancelConfirm = () => {
    setIsConfirming(false);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onFormSubmit, (invalidData) => {
          console.log("invalid form data");
          console.log(invalidData);
        })}
        id="order-form"
        className="mt-2 flex  w-full grow flex-col"
      >
        <section
          className={`w-full grow flex-col ${
            !isConfirming ? "flex" : "hidden"
          }`}
          id="from-input-group"
        >
          <div className="flex space-x-7">
            <Input
              register={register}
              registerRules={{
                required: "Ce champ est obligatoire",
                validate: orderFormValidators.phone,
              }}
              error={errors.phone?.message}
              name="phone"
              id="phone-input"
              label="Telephone"
              type="tel"
              placeholder="Votre Numero de Téléphone"
              maxLength={10}
              defaultValue={confirmData?.phone}
            />
            <WilayaSelectInput
              register={register}
              name="wilaya"
              registerRules={{
                validate: orderFormValidators.wilaya,
              }}
              error={errors.wilaya?.message}
              id="wilaya-select"
              label="Wilaya de Livraison"
            />
          </div>
          <div className="flex space-x-7">
            <ShippingTypeSelector />
          </div>
          <button
            type="button"
            className="mb-2 flex h-10 items-center justify-between rounded-md pl-2  text-stone-100 transition-colors hover:dark:bg-[#17181D]"
            onClick={() => setShowOptionalFields(!showOptionalFields)}
          >
            <span>Information optionnelle</span>
            <MdChevronRight
              className={`h-8 w-8 ${
                showOptionalFields ? "-rotate-90" : "rotate-90"
              }`}
            />
          </button>
          {showOptionalFields && (
            <section id="more-info-fields">
              <div className="flex space-x-7">
                <Input
                  register={register}
                  registerRules={{
                    required: false,
                    validate: orderFormValidators.surname,
                  }}
                  error={errors.lastName?.message}
                  name="lastName"
                  id="lastname-input"
                  label="Nom"
                  placeholder="Votre Nom (Optionnel)"
                  maxLength={40}
                  minLength={3}
                  defaultValue={confirmData?.lastName}
                />
                <Input
                  register={register}
                  registerRules={{
                    required: false,
                    validate: orderFormValidators.name,
                  }}
                  error={errors.name?.message}
                  name="name"
                  id="name-input"
                  label="Prénom"
                  placeholder="Votre Prénom (Optionnel)"
                  maxLength={40}
                  minLength={3}
                  defaultValue={confirmData?.name}
                />
              </div>
              <Input
                register={register}
                registerRules={{
                  required: false,
                  validate: orderFormValidators.email,
                }}
                error={errors.email?.message}
                name="email"
                id="email-input"
                label="Email"
                type="email"
                placeholder="Votre Email (Optionnel)"
                defaultValue={confirmData?.email}
              />
            </section>
          )}
        </section>
        {/* Show the orderConfirm component */}
        {isConfirming && selectedWilaya && confirmData !== null && (
          <OrderConfirm data={confirmData} selectedWilaya={selectedWilaya} />
        )}
        <div className="flex h-16 items-start justify-end text-stone-950 dark:text-white">
          <Prices />
        </div>
        {/* BUTTONS */}
        <div
          className="flex h-12 w-full justify-end gap-4 text-stone-500"
          id="form-buttons"
        >
          {isConfirming && (
            <button
              disabled={isLoading}
              className="text h-12 w-auto gap-2 rounded-lg px-6 focus:bg-stone-950/70 dark:bg-stone-950 disabled:cursor-not-allowed"
              onClick={cancelConfirm}
            >
              <MdArrowBack className="h-6 w-6" /> Retour
            </button>
          )}

          <button
            className="text flex h-12 w-44 items-center justify-center self-end rounded-lg bg-primary px-4 font-semibold text-white transition-colors hover:bg-[#fd4949] focus:bg-primary-darker disabled:cursor-not-allowed  disabled:bg-stone-200 disabled:text-stone-400 dark:bg-blue-600 dark:hover:bg-secondary dark:focus:bg-blue-700 disabled:dark:bg-stone-700 disabled:dark:text-stone-900"
            disabled={isDisabledSubmit || isLoading || isSuccess}
          >
            {isLoading ? (
              <Loader className="h-6 w-6 border-white" />
            ) : (
              <span className="flex gap-2">
                <MdOutlineShoppingCart className="h-6 w-6" /> Commander
              </span>
            )}
            {/*  */}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
