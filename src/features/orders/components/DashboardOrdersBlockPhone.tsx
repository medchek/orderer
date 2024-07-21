import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Textarea from "@/components/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostBlacklist } from "../../blacklist/api/postBlacklist";
import { orderFormValidators } from "@/lib/formValidators";
import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import ModalActionButtons from "@/components/ModalActionButtons";

interface Props {
  phone?: string;
  /** indifinite modal title. Display "un" instead of "le" */
  indefinite?: boolean;
  closeModal: () => void;
}

interface BlockUserFormValues {
  phone: string;
  reason: string;
}

export default function DashboardOrdersBlockPhone({
  indefinite,
  closeModal,
  phone,
}: Props) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useStore();

  const { mutate, isPending } = usePostBlacklist({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders._def });
      queryClient.invalidateQueries({ queryKey: queryKeys.blacklist._def });
      closeModal();
      showSnackbar("Numéro bloqué", "default");
    },
    onError: () => {
      showSnackbar("Une erreur est survenu, veuillez réessayer", "error");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlockUserFormValues>();

  const onFormSubmit: SubmitHandler<BlockUserFormValues> = (data) => {
    console.log(data);
    mutate(data);
  };

  const validateReasonValue = (val: string) => {
    const v = val.trim();
    if (!v.length) return;
    if (v.length < 2 || v.length > 200) {
      return "La raison du blocage doit être entre 2 et 200 caractères";
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      closeOnClickOutside
      label={`Bloquer ${indefinite ? "un" : "le"} numéro`}
      className="flex h-auto w-3/5 flex-col gap-4 rounded-lg bg-[#F3F3F3] px-4 py-5 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      centerModalContent
    >
      <form
        className="px-2"
        onSubmit={handleSubmit(onFormSubmit, (err) => {
          console.error("Error submitting blacklist form", err);
        })}
      >
        {phone && (
          <p className="py-2 text-stone-400">
            Êtes-vous sûr de vouloir Bloquer le numéro
            <span className="font-semibold text-stone-200"> {phone}</span>.
            Aucune commande ne pourra être créée avec.
          </p>
        )}

        <Input
          label="Numéro"
          placeholder="Numéro à bloquer"
          hidden={!!phone}
          name="phone"
          maxLength={10}
          minLength={10}
          register={register}
          defaultValue={phone}
          disabled={!!phone}
          registerRules={{
            required: "Ce champ est obligatoire",
            value: phone,
            validate: orderFormValidators.phone,
          }}
          error={errors.phone?.message}
        />

        <Textarea
          label="Raison"
          name="reason"
          className="max-h-32"
          placeholder="Raison du blocage (optionnel)"
          maxLength={200}
          minLength={2}
          register={register}
          registerRules={{
            validate: validateReasonValue,
          }}
          error={errors.reason?.message}
        />

        <ModalActionButtons
          confirmButtonType="submit"
          onCancel={closeModal}
          isLoading={isPending}
          confirmText="Bloquer"
          confirmClassName="active:bg-red-700 bg-red-600 hover:bg-red-500 text-neutral-100"
        />
      </form>
    </Modal>
  );
}
