"use client";

import Input from "../../Input";
import ShippingTypeSelector from "./ShippingTypeSelector";

import { MdArrowBack, MdOutlineShoppingCart } from "react-icons/md";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { orderFormValidators } from "@/lib/formValidators";
import { useStore } from "@/store";
import Prices from "./Prices";
import OrderConfirm from "../OrderConfirm";
import { toPositiveNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";
import TownSelect from "./TownSelect";
import { useEffectOnce } from "usehooks-ts";
import WilayaSelect from "./WilayaSelect";
import {
  PostOrderFormData,
  usePostOrder,
} from "@/features/orders/api/postOrder";

import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import Button from "@/components/Button";
import { AccountDetail } from "@/features/settings/types";
import { STATUS_TOO_MANY_REQUESTS } from "@/lib/constants";

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
    selectedWilaya,
    selectedTown,
    setConfirmData,
    confirmData,
    isConfirming,
    setIsConfirming,
    removeAllSelectedProducts,
    showSnackbar,
  } = useStore();
  const methods = useForm<OrderFormValues>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffectOnce(() => {
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
      removeAllSelectedProducts();
      setIsConfirming(false);
    };
  });

  const isDisabledSubmit =
    selectedProducts.length === 0 ||
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
      showSnackbar("Une érreur est survenu, veuillez reéssayer", "error");
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

      if (!selectedProducts.length) {
        return showSnackbar("Aucune produit n'a été sélectioné", "error");
      }

      const recaptchaToken = await recaptchaRef.current?.executeAsync();

      if (!recaptchaToken) return;

      const requestData: PostOrderFormData = {
        token: recaptchaToken,
        data: {
          isHome,
          phone,
          productsCode: selectedProducts.map((p) => p.code),
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
          className="mt-2 flex  w-full grow flex-col"
        >
          <section
            className={`w-full grow flex-col ${
              !isConfirming ? "flex" : "hidden"
            }`}
            id="from-input-group"
          >
            <div className="2xl:gap- flex gap-4">
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
                  validate: orderFormValidators.name,
                }}
                error={errors.name?.message}
                name="name"
                id="name-input"
                label="Nom/Prénom"
                type="text"
                placeholder="Votre Nom/Prénom (Optionnel)"
                maxLength={10}
                defaultValue={confirmData?.name}
              />
            </div>
            <div className="flex gap-4 2xl:gap-7">
              <WilayaSelect<OrderFormValues>
                register={register}
                error={errors.wilaya?.message}
                id="wilaya-select"
                defaultValue={
                  confirmData
                    ? confirmData.wilaya
                    : accountDetail?.wilaya ?? undefined
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
                    : accountDetail?.town ?? undefined
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
          <div className="flex h-16 items-start justify-end text-stone-950 dark:text-white">
            <Prices />
          </div>
          {/* BUTTONS */}
          <div
            className="flex h-12 w-full justify-end gap-4 text-stone-500"
            id="form-buttons"
          >
            {isConfirming && !isSuccess && !isPending && (
              <button
                disabled={isPending}
                className="text h-12 w-auto gap-2 rounded-lg px-6 focus:bg-stone-950/70 disabled:cursor-not-allowed dark:bg-stone-950"
                onClick={cancelConfirm}
              >
                <MdArrowBack className="h-6 w-6" /> Retour
              </button>
            )}
            <Button
              className="text flex h-12 w-44 items-center justify-center self-end rounded-lg bg-primary px-4 font-semibold text-white transition-colors hover:bg-[#fd4949] focus:bg-primary-darker disabled:cursor-not-allowed  disabled:bg-stone-200 disabled:text-stone-400 dark:bg-blue-600 dark:hover:bg-secondary dark:focus:bg-blue-700 disabled:dark:bg-neutral-900 disabled:dark:text-neutral-700"
              disabled={isDisabledSubmit || isPending || isSuccess}
              isLoading={isPending || isSuccess}
            >
              <span className="flex gap-2">
                <MdOutlineShoppingCart className="h-6 w-6" /> Commander
              </span>
            </Button>
          </div>
        </form>
      </FormProvider>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
        onError={() => {
          resetCaptcha();
          showSnackbar(
            "Une érreur s'est produite lors de la validation du captcha, veuillez vefifier cotre connexion",
            "error",
          );
        }}
        onExpired={() => {
          resetCaptcha();
          showSnackbar("Captcha expiré, veuillez reéssayer", "error");
        }}
        theme="dark"
        badge="bottomleft"
        size="invisible"
      />
    </>
  );
}
