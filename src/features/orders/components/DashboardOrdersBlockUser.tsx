import Input from "@/components/Input";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import Textarea from "@/components/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostBlacklist } from "../../blacklist/api/postBlacklist";
import { orderFormValidators } from "@/lib/formValidators";
import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

interface Props {
  phone?: string;
  closeModal: () => void;
}

interface BlockUserFormValues {
  phone: string;
  reason: string;
}

export default function DashboardOrdersBlockUser({ closeModal, phone }: Props) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useStore();

  const { mutate, isPending } = usePostBlacklist({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders._def });
      queryClient.invalidateQueries({ queryKey: queryKeys.blacklist._def });
      closeModal();
      showSnackbar("Numéro bloquée", "default");
    },
    onError: () => {
      showSnackbar("Une érreur est survenu, veuillez reéssayer", "error");
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
      // label="Supprimer un produit"
      label="Bloquer le numéro"
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
          placeholder="Raison du blocage (optionnel)"
          maxLength={200}
          minLength={2}
          register={register}
          registerRules={{
            validate: validateReasonValue,
          }}
          error={errors.reason?.message}
        />
        <section
          id="form-buttons"
          className="flex items-center justify-end gap-4"
        >
          <button
            type="button"
            className="h-10 w-36 rounded-md font-semibold transition-colors dark:bg-white/10 dark:text-stone-400 dark:hover:bg-white/[0.15] dark:focus:bg-white/5"
            onClick={closeModal}
            disabled={isPending}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="h-10 w-36 rounded-md bg-red-600 font-semibold text-neutral-100 transition-colors hover:bg-red-500 focus:bg-red-700 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-400 dark:text-neutral-100 disabled:dark:bg-stone-600"
            // disabled
            disabled={isPending}
          >
            {isPending ? <Loader className="h-6 w-6" /> : <span>Bloquer</span>}
          </button>
        </section>
      </form>
    </Modal>
  );
}
