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
import Loader from "@/components/Loader";
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

export default function OrderForm() {
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

    // set select values for the form
    if (confirmData) {
      setValue("wilaya", confirmData.wilaya);
      setValue("town", confirmData.town);
    }
    return () => {
      removeAllSelectedProducts();
      setIsConfirming(false);
    };
  });

  const isDisabledSubmit =
    selectedProducts.length === 0 ||
    selectedWilaya === null ||
    selectedTown === null;

  const { mutate, isLoading, isSuccess } = usePostOrder({
    onSuccess: ({ orderCode }) => {
      replace(`/thanks?code=${orderCode}`);
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
          wilayaId: toPositiveNumber(wilaya),
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
              <WilayaSelect
                register={register}
                error={errors.wilaya?.message}
                id="wilaya-select"
                defaultValue={confirmData?.wilaya}
              />
              <TownSelect
                register={register}
                error={errors.town?.message}
                id="town-select"
                defaultValue={confirmData?.town}
              />
            </div>
            <div className="flex gap-7">
              <ShippingTypeSelector />
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
            {isConfirming && !isSuccess && !isLoading && (
              <button
                disabled={isLoading}
                className="text h-12 w-auto gap-2 rounded-lg px-6 focus:bg-stone-950/70 disabled:cursor-not-allowed dark:bg-stone-950"
                onClick={cancelConfirm}
              >
                <MdArrowBack className="h-6 w-6" /> Retour
              </button>
            )}
            <button
              className="text flex h-12 w-44 items-center justify-center self-end rounded-lg bg-primary px-4 font-semibold text-white transition-colors hover:bg-[#fd4949] focus:bg-primary-darker disabled:cursor-not-allowed  disabled:bg-stone-200 disabled:text-stone-400 dark:bg-blue-600 dark:hover:bg-secondary dark:focus:bg-blue-700 disabled:dark:bg-stone-800 disabled:dark:text-stone-600"
              disabled={isDisabledSubmit || isLoading || isSuccess}
            >
              {isLoading || isSuccess ? (
                <Loader className="h-6 w-6 border-white" />
              ) : (
                <span className="flex gap-2">
                  <MdOutlineShoppingCart className="h-6 w-6" /> Commander
                </span>
              )}
            </button>
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
        badge="bottomright"
        size="invisible"
      />
    </>
  );
}
