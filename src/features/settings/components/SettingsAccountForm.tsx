"use client";
import Button from "@/components/Button";

import Input from "@/components/Input";
import WilayaSelect from "@/components/home/order-form/WilayaSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import TownSelect from "@/components/home/order-form/TownSelect";
import { orderFormValidators } from "@/lib/formValidators";
import { SettingsAccountFormValues } from "@/features/settings/types";
import {
  PatchAccountPayload,
  usePatchAccount,
} from "@/features/settings/api/patchAccount";
import { toPositiveNumber } from "@/lib/utils";

import {
  GetAccountResponse,
  useGetAccount,
} from "@/features/settings/api/getAccount";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useStore } from "@/store";
import Loader from "@/components/Loader";
// TODO:
export default function SettingsAccountForm() {
  const { showSnackbar } = useStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingsAccountFormValues>();

  const { data: accountData, isFetching: isFetchingAccountData } =
    useGetAccount();

  const { mutate: patchAccount, isPending } = usePatchAccount({
    onError: () => {
      showSnackbar("Une érreur est survenu, veuillez reéssayer", "error");
    },
    onSuccess: (_, newData) => {
      const currentData = queryClient.getQueryData<GetAccountResponse>(
        queryKeys.account.currentSession.queryKey,
      );

      // replace undefined data with null values
      const newDataNullified: GetAccountResponse = {
        phone: newData.address ? newData.address : null,
        fullName: newData.fullName ? newData.fullName : null,
        wilaya: newData.wilaya ? newData.wilaya : null,
        town: newData.town ? newData.town : null,
        address: newData.address ? newData.address : null,
      };

      // if the current data object is undefined, set the newly addded values to it, otherwise, copy and update the new values only
      const updatedData: GetAccountResponse = !currentData
        ? newDataNullified
        : Object.assign(currentData, newData);

      queryClient.setQueryData<GetAccountResponse>(
        queryKeys.account.currentSession.queryKey,
        updatedData,
      );

      showSnackbar("Informations modifiées avec succès");
    },
  });

  const onFormSubmit: SubmitHandler<SettingsAccountFormValues> = async (
    formData,
    e,
  ) => {
    e?.preventDefault();
    if (!accountData) return;

    const {
      address: accAddress,
      fullName: accFullName,
      phone: accPhone,
      wilaya: accWilaya,
      town: accTown,
    } = accountData;

    const processedData = Object.entries(formData).filter(([_, val]) => {
      return val !== undefined && val !== "" && val !== "0";
    });

    const {
      address,
      fullName,
      phone,
      wilaya,
      town,
    }: Partial<SettingsAccountFormValues> = Object.fromEntries(processedData);

    const requestBody: PatchAccountPayload = {};

    if (phone && phone.trim() !== accPhone) {
      requestBody.phone = phone.trim();
    }
    if (fullName && fullName.trim() !== accFullName) {
      requestBody.fullName = fullName.trim();
    }
    if (address && address.trim() !== accAddress) {
      requestBody.address = address.trim();
    }
    if (wilaya && wilaya.trim() !== accWilaya?.toString()) {
      requestBody.wilaya = toPositiveNumber(wilaya);
    }
    if (town && wilaya && town.trim() !== accTown?.toString()) {
      // server expects the wilaya code with the town code
      requestBody.wilaya = toPositiveNumber(wilaya);
      requestBody.town = toPositiveNumber(town);
    }

    // check if anthing has changed
    if (Object.keys(requestBody).length === 0) {
      return showSnackbar("Rien n'a été modifié");
    }
    patchAccount(requestBody);
  };

  if (isFetchingAccountData) {
    return (
      <div className="flex h-10 items-center gap-2">
        <Loader className="h-4 w-4 border-neutral-500 border-r-transparent" />
        <p className="text-neutral-500">Chargement des informations...</p>
      </div>
    );
  } else {
    return (
      <form
        id="settings-form"
        className="flex grow flex-col justify-between px-1"
        onSubmit={handleSubmit(onFormSubmit, (err) => {
          console.error("Error submitting form:", err);
        })}
      >
        <div className="h-full grow">
          <div className="mt-2 flex flex-col">
            <Input<SettingsAccountFormValues>
              name="phone"
              label="Téléphone"
              placeholder="Numero de téléphone"
              type="tel"
              registerRules={{
                validate: orderFormValidators.phone,
              }}
              autoComplete="off"
              register={register}
              error={errors.phone?.message}
              defaultValue={accountData?.phone ?? ""}
            />
            <Input<SettingsAccountFormValues>
              name="fullName"
              label="Nom complet"
              autoComplete="off"
              placeholder="Votre nom et prénom"
              register={register}
              registerRules={{
                validate: orderFormValidators.name,
              }}
              error={errors.fullName?.message}
              defaultValue={accountData?.fullName ?? ""}
            />

            <div className="flex flex-col xl:flex-row xl:gap-2">
              <WilayaSelect<SettingsAccountFormValues>
                register={register}
                registerRules={{
                  required: false,
                }}
                id="wilaya-select"
                error={errors.wilaya?.message}
                defaultValue={accountData?.wilaya ?? ""}
                setFormHookValue={setValue}
              />
              <TownSelect<SettingsAccountFormValues>
                register={register}
                id="town-select"
                registerRules={{
                  required: false,
                }}
                error={errors.town?.message}
                defaultValue={accountData?.town ?? ""}
                setFormHookValue={setValue}
              />
            </div>
            <Input<SettingsAccountFormValues>
              name="address"
              label="Addresse"
              autoComplete="off"
              error={errors.address?.message}
              register={register}
              registerRules={{
                validate: orderFormValidators.address,
              }}
              placeholder="Votre addresse de livraison à domicile"
              defaultValue={accountData?.address ?? ""}
            />
          </div>
        </div>
        <div className="flex h-14 min-h-[3.5rem] grow-0 justify-end">
          <Button
            className="text-sm font-normal"
            type="submit"
            isLoading={isPending}
          >
            Sauvegarder
          </Button>
        </div>
      </form>
    );
  }
}
