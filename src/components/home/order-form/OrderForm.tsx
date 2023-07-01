"use client";

import React from "react";
import Input from "../../Input";
import WilayaSelectInput from "./WilayaSelectInput";
import ShippingTypeSelector from "./ShippingTypeSelector";

import { MdOutlineShoppingCart } from "react-icons/md";
import { useForm, FormProvider } from "react-hook-form";
import { orderFormValidators } from "@/lib/formValidators";
import { useStore } from "@/store";

type Props = {};

export default function OrderForm({}: Props) {
  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { selectedProducts, selectedWilaya } = useStore();

  const isDisabledSubmit =
    selectedProducts.length === 0 || selectedWilaya === null;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log("submitting");
            console.log(data);
          },
          (invalidData) => {
            console.log("invalid form data");
            console.log(invalidData);
          }
        )}
        id="order-form"
        className="mt-2 flex w-full grow flex-col "
      >
        <div className="flex w-full grow flex-col">
          <div className="flex space-x-7">
            <Input
              register={register}
              registerRules={{
                required: false,
                validate: orderFormValidators.surname,
              }}
              error={errors["lastname"]?.message as string}
              name="lastname"
              id="lastname-input"
              label="Nom"
              placeholder="Votre Nom (Optionnel)"
              maxLength={40}
              minLength={3}
            />
            <Input
              register={register}
              registerRules={{
                required: false,
                validate: orderFormValidators.name,
              }}
              error={errors["name"]?.message as string}
              name="name"
              id="name-input"
              label="Prénom"
              placeholder="Votre Prénom (Optionnel)"
              maxLength={40}
              minLength={3}
            />
          </div>
          <div className="flex space-x-7">
            <Input
              register={register}
              registerRules={{
                required: "Ce champ est obligatoire",
                validate: orderFormValidators.phone,
              }}
              error={errors["phone"]?.message as string}
              name="phone"
              id="phone-input"
              label="Telephone"
              type="tel"
              placeholder="Votre Numero de Téléphone"
              maxLength={10}
            />
            <Input
              register={register}
              registerRules={{
                required: false,
                validate: orderFormValidators.email,
              }}
              error={errors["email"]?.message as string}
              name="email"
              id="email-input"
              label="Email"
              type="email"
              placeholder="Votre Email (Optionnel)"
            />
          </div>
          <div className="flex space-x-7">
            <WilayaSelectInput
              register={register}
              name="wilaya"
              registerRules={{
                validate: orderFormValidators.wilaya,
              }}
              error={errors["wilaya"]?.message as string}
              id="wilaya-select"
              label="Wilaya de Livraison"
            />
            <ShippingTypeSelector />
          </div>
        </div>

        <button
          className={`text flex h-12 w-44 items-center justify-center space-x-4 self-end rounded-lg bg-primary font-semibold text-white transition-colors hover:bg-[#fd4949] focus:bg-primary-darker disabled:bg-stone-200  disabled:text-stone-400 disabled:dark:bg-stone-700 disabled:dark:text-stone-800 ${
            isDisabledSubmit && "cursor-not-allowed"
          }`}
          disabled={isDisabledSubmit}
        >
          <MdOutlineShoppingCart className="h-6 w-6" /> Commander
        </button>
      </form>
    </FormProvider>
  );
}
