import Modal from "@/components/Modal";
import {
  ShippingLocation,
  ShippingLocationsFormValues,
  ShippingLocationsSubmitData,
} from "../types";
import Input from "@/components/Input";
import WilayaSelect from "@/components/home/order-form/WilayaSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import TownSelect from "@/components/home/order-form/TownSelect";
import ModalActionButtons from "@/components/ModalActionButtons";
import { useStore } from "@/store";
import { googleMapsLinkRegex } from "@/lib/patterns";
import { toPositiveNumber } from "@/lib/utils";
import { useEffectOnce } from "usehooks-ts";

interface Props {
  /** Function to run when closing the form modal */
  onCloseModal?: () => void;
  isLoading: boolean;
  /** Data is timmed and string numbers are converted to numbers */
  onSubmit: (data: ShippingLocationsSubmitData) => void;

  /** when this is set, the component will switch to edit mode */
  locationData?: ShippingLocation;

  disableSubmit?: boolean;
}

export default function DashboardShippingLocationsFormModal({
  locationData,
  onCloseModal,
  isLoading,
  disableSubmit,
  onSubmit,
}: Props) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingLocationsFormValues>();

  const { setSelectedWilaya, setSelectedTown, setIsShippingLocationModalOpen } =
    useStore();

  useEffectOnce(() => {
    // set the values of wilaya and town if the user sends location data for update
    if (locationData) {
      setValue("town", locationData.town.code.toString());
      setValue("wilaya", locationData.wilaya.code.toString());
    }
  });

  const onFormSubmit: SubmitHandler<ShippingLocationsFormValues> = async (
    data,
    e,
  ) => {
    e?.preventDefault();
    const { name, additionalCosts, coordinates, town, wilaya } = data;
    const processedData: ShippingLocationsSubmitData = {
      name: name.trim(),
      additionalCosts: !additionalCosts.trim()
        ? null
        : toPositiveNumber(additionalCosts),
      coordinates: coordinates.trim().length > 0 ? coordinates.trim() : null,
      town: toPositiveNumber(town),
      wilaya: toPositiveNumber(wilaya),
    };
    onSubmit(processedData);
  };

  const handleCloseModal = () => {
    if (onCloseModal) onCloseModal();
    setIsShippingLocationModalOpen(false);
    setSelectedWilaya(null);
    setSelectedTown(null);
  };

  return (
    <Modal
      className="flex w-full flex-col rounded-lg bg-[#F3F3F3] px-8 py-5 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      closeModal={handleCloseModal}
      label={`${
        locationData !== undefined ? "Modifier" : "Ajouter"
      } un point de livraison`}
      closeOnClickOutside
      centerModalContent
    >
      <form
        encType="multipart/form-data"
        className="flex h-full w-full flex-col justify-between overflow-auto"
        onSubmit={handleSubmit(onFormSubmit, (err) => {
          console.error("Error submitting form:", err);
        })}
      >
        <section
          id="dashboard-add-product-form"
          className="flex h-full w-full grow flex-col justify-between  overflow-y-auto px-2 pt-5"
        >
          <section className="flex grow flex-col">
            <Input<ShippingLocationsFormValues>
              label="Nom"
              name="name"
              autoComplete="off"
              maxLength={150}
              register={register}
              registerRules={{
                required: "Ce champ est obligatoire",
                validate: (val: string) => {
                  const v = val.trim();
                  if (v.length < 2 || v.length > 150)
                    return "Le nom doit contenir entre 2 et 150 caracètres";
                },
              }}
              placeholder="Nom du point de livraison"
              error={errors.name?.message}
              defaultValue={locationData?.name}
            />
            <div className="flex w-full grow-0 gap-5">
              <WilayaSelect<ShippingLocationsFormValues>
                id="wilaya-code-select"
                register={register}
                registerRules={{
                  required: "Aucune wilaya n'a été selectionnée",
                }}
                hidePrice
                error={errors.wilaya?.message}
                defaultValue={locationData?.wilaya.code}
              />
              <TownSelect<ShippingLocationsFormValues>
                id="town-code-select"
                register={register}
                error={errors.town?.message}
                defaultValue={locationData?.town.code}
              />
            </div>
            <Input<ShippingLocationsFormValues>
              label="Coordonnées"
              name="coordinates"
              type="url"
              autoComplete="off"
              register={register}
              registerRules={{
                validate: (val: string) => {
                  const v = val.trim();
                  if (!v) return;
                  if (!googleMapsLinkRegex.test(v)) {
                    return "Ce lien n'est pas valide (ex: https://maps.app.goo.gl/wnR4nAXuKQUhu5387)";
                  }
                },
              }}
              placeholder="Lien Google Maps du bureau de livraison (optionnel)"
              info="Lien de partage du point de livraison Google Maps (ex: https://maps.app.goo.gl/wnR4nAXuKQUhu5387)"
              error={errors.coordinates?.message}
              defaultValue={locationData?.coordinates ?? undefined}
            />
            <Input<ShippingLocationsFormValues>
              type="number"
              label="Tarifs additionnels"
              name="additionalCosts"
              min={0}
              info="Un tarif additionnel peut être ajouté au prix de livraison initial pour ce point (ex: pour livraison express)"
              register={register}
              registerRules={
                {
                  //   validate: addProductValidators.stock,
                }
              }
              error={errors.additionalCosts?.message}
              placeholder="Tarifs additionnels (optionnel)"
              defaultValue={locationData?.additionalCosts ?? undefined}
            />
          </section>
        </section>
        <ModalActionButtons
          id="form-buttons"
          className="mt-2 flex h-12 min-h-[3rem] items-center justify-end gap-4"
          confirmText={locationData !== undefined ? "Modifier" : "Ajouter"}
          onCancel={handleCloseModal}
          confirmButtonType="submit"
          disableCancel={isLoading}
          disabledSubmit={isLoading || disableSubmit}
          isLoading={isLoading}
        />
      </form>
    </Modal>
  );
}
