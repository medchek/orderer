"use client";

import Input from "../../Input";
import ShippingTypeSelector from "./ShippingTypeSelector";

import { MdArrowBack } from "react-icons/md";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { orderFormValidators } from "@/lib/formValidators";
import { useStore } from "@/store";
import Prices from "./Prices";
import OrderConfirm from "../OrderConfirm";
import { toPositiveNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";
import TownSelect from "./TownSelect";
import WilayaSelect from "./WilayaSelect";
import {
  PostOrderFormData,
  usePostOrder,
} from "@/features/orders/api/postOrder";

import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import { AccountDetail } from "@/features/settings/types";
import { STATUS_TOO_MANY_REQUESTS } from "@/lib/constants";
import { useSelectedProductsCount } from "@/features/products/hooks/useSelectedProductsCount";
import { FiShoppingCart } from "react-icons/fi";

export interface OrderFormValues {
  lastName: string;
  name: string;
  phone: string;
  email: string;
  wilaya: string;
  town: string;
  address: string;
  isHome: boolean;
  // when isHome is false, location id can be provided
  locationId: string;
}

interface Props {
  accountDetail: AccountDetail | null;
}

export default function OrderForm({ accountDetail }: Props) {
  const { replace, prefetch } = useRouter();
  const {
    selectedProducts,
    selectedProductsQuantity,
    selectedWilaya,
    selectedTown,
    setConfirmData,
    confirmData,
    isConfirming,
    setIsConfirming,
    showSnackbar,
  } = useStore();
  const selectedProductsCount = useSelectedProductsCount();

  const methods = useForm<OrderFormValues>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    prefetch("/thanks");

    if (accountDetail) {
      const { address, fullName, phone, town, wilaya } = accountDetail;

      setValue("phone", phone ?? "");
      setValue("name", fullName ?? "");
      setValue("wilaya", wilaya?.toString() ?? "");
      setValue("town", town?.toString() ?? "");
      setValue("address", address ?? "");
    }
    // set select values for the form

    return () => {
      setIsConfirming(false);
    };
  }, [accountDetail, prefetch, setIsConfirming, setValue]);

  const isDisabledSubmit =
    selectedProductsCount === 0 ||
    selectedWilaya === null ||
    selectedTown === null;

  const { mutate, isPending, isSuccess } = usePostOrder({
    onSuccess: ({ orderCode }) => {
      replace(`/thanks?code=${orderCode}`);
    },
    onError: (e) => {
      if (e.response.status === STATUS_TOO_MANY_REQUESTS) {
        return showSnackbar(
          "Vous avez atteint le nombre maximum de commandes que vous pouvez soumettre. Réessayez plus tard",
          "error",
        );
      }
      showSnackbar("Une erreur est survenu, veuillez réessayer", "error");
    },
  });

  const cancelConfirm = () => {
    setIsConfirming(false);
  };

  /**
   * RECAPTCHA
   */
  // const [showOptionalFields, setShowOptionalFields] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const resetCaptcha = () => {
    if (recaptchaRef.current) recaptchaRef.current?.reset();
  };

  const onFormSubmit: SubmitHandler<OrderFormValues> = async (data, e) => {
    e?.preventDefault();
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
      const {
        address,
        email,
        isHome,
        lastName,
        name,
        phone,
        wilaya,
        town,
        locationId,
      } = data;

      if (selectedProductsCount <= 0) {
        return showSnackbar("Aucune produit n'a été sélectionné", "error");
      }

      const recaptchaToken = await recaptchaRef.current?.executeAsync();

      if (!recaptchaToken) return;

      const products: PostOrderFormData["data"]["products"] = Object.keys(
        selectedProducts,
      ).reduce(
        (obj, key) => {
          obj[key] = { quantity: selectedProductsQuantity[key] };

          return obj;
        },
        {} as PostOrderFormData["data"]["products"],
      );

      const requestData: PostOrderFormData = {
        token: recaptchaToken,
        data: {
          isHome,
          phone,
          products,
          wilayaCode: toPositiveNumber(wilaya),
          townCode: toPositiveNumber(town),
          ...(email && { email }),
          ...(name && { name }),
          ...(lastName && { lastName }),
          ...(isHome && { address }),
          ...(locationId && { locationId }),
        },
      };

      mutate(requestData);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onFormSubmit, (invalidData) => {
            console.log("invalid form data");
            console.log(invalidData);
          })}
          id="order-form"
          className="mt-2 flex w-full grow flex-col"
        >
          <section
            className={`w-full grow flex-col ${
              !isConfirming ? "flex" : "hidden"
            }`}
            id="from-input-group"
          >
            <div className="flex flex-col lg:flex-row lg:gap-4">
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
                placeholder="Votre Numéro de Téléphone"
                maxLength={10}
                defaultValue={confirmData?.phone}
              />
              <Input
                register={register}
                registerRules={{
                  required: "Ce champ est obligatoire",
                  validate: orderFormValidators.name,
                }}
                error={errors.name?.message}
                name="name"
                id="name-input"
                label="Nom/Prénom"
                type="text"
                placeholder="Votre Nom/Prénom"
                maxLength={10}
                defaultValue={confirmData?.name}
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-4">
              <WilayaSelect<OrderFormValues>
                register={register}
                error={errors.wilaya?.message}
                id="wilaya-select"
                defaultValue={
                  confirmData
                    ? confirmData.wilaya
                    : (accountDetail?.wilaya ?? undefined)
                }
                setFormHookValue={setValue}
              />
              <TownSelect<OrderFormValues>
                register={register}
                error={errors.town?.message}
                id="town-select"
                defaultValue={
                  confirmData
                    ? confirmData.town
                    : (accountDetail?.town ?? undefined)
                }
                setFormHookValue={setValue}
              />
            </div>
            <div className="flex gap-7">
              <ShippingTypeSelector
                addressDefaultValue={accountDetail?.address ?? undefined}
              />
            </div>
          </section>
          {/* Show the orderConfirm component */}
          {isConfirming &&
          selectedWilaya &&
          selectedTown &&
          confirmData !== null ? (
            <OrderConfirm
              data={confirmData}
              selectedWilaya={selectedWilaya}
              selectedTown={selectedTown}
            />
          ) : null}
          <div className="flex h-12 items-start justify-end text-sm text-neutral-950 dark:text-white lg:h-16 lg:text-base">
            <Prices />
          </div>
          {/* BUTTONS */}
          <div
            className="flex h-12 w-full justify-end gap-4 text-neutral-500"
            id="form-buttons"
          >
            {isConfirming && !isSuccess && !isPending && (
              <button
                disabled={isPending}
                className="h-12 w-auto gap-2 rounded-lg bg-neutral-200 px-6 text-sm active:bg-neutral-300 disabled:cursor-not-allowed dark:bg-neutral-950 dark:active:bg-neutral-950/70 lg:text-base"
                onClick={cancelConfirm}
              >
                <MdArrowBack className="h-6 w-6" /> Retour
              </button>
            )}

            <Button
              // hover:bg-[#fd4949] focus:bg-primary-darker bg-primary
              className="text flex h-12 w-full items-center justify-center self-end rounded-lg bg-blue-600 px-4 font-semibold text-white transition-colors hover:bg-secondary active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400 dark:disabled:bg-neutral-900 dark:disabled:text-neutral-700 lg:w-44"
              disabled={isDisabledSubmit || isPending || isSuccess}
              isLoading={isPending || isSuccess}
            >
              <span className="flex items-center gap-2">
                <FiShoppingCart className="size-[1.35rem]" />
                <span>{isConfirming ? "Commander" : "Continuer"}</span>
              </span>
            </Button>
          </div>
        </form>
      </FormProvider>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
        className="opacity-50"
        onError={() => {
          resetCaptcha();
          showSnackbar(
            "Une erreur s'est produite lors de la validation du captcha, veuillez verifier cotre connexion",
            "error",
          );
        }}
        onExpired={() => {
          resetCaptcha();
          showSnackbar("Captcha expiré, veuillez réessayer", "error");
        }}
        theme="dark"
        badge="bottomleft"
        size="invisible"
      />
    </>
  );
}
