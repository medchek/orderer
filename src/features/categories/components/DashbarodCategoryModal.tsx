import Input from "@/components/Input";
import Modal from "@/components/Modal";
import ModalActionButtons from "@/components/ModalActionButtons";
import { FormEventHandler } from "react";
import {
  FieldValues,
  RegisterOptions, UseFormRegister
} from "react-hook-form";

interface Props<T extends FieldValues> {
  closeModal: () => void;
  inputPlaceholder: string;
  label: string;
  inputName: keyof T;
  register?: UseFormRegister<T>;
  registerRules?: RegisterOptions;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  error?: string;
  isLoading?: boolean;
  defaultValue?: string;
}

export default function DashbarodCategoryModal<T extends FieldValues>({
  closeModal,
  inputName,
  handleSubmit,
  register,
  registerRules,
  inputPlaceholder,
  error,
  label,
  isLoading,
  defaultValue,
}: Props<T>) {
  return (
    <Modal
      className="flex w-full h-auto flex-col gap-4  rounded-lg bg-[#F3F3F3] px-8 py-5 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      closeModal={closeModal}
      label={label}
      centerModalContent
      closeOnClickOutside
    >
      <form
        encType="multipart/form-data"
        className="flex h-full w-full flex-col justify-between overflow-auto"
        onSubmit={handleSubmit}
      >
        <div className="px-2">
          <Input
            autoComplete="off"
            label="Nom"
            placeholder={inputPlaceholder}
            name={inputName as string}
            register={register}
            registerRules={registerRules}
            error={error}
            autoFocus
            defaultValue={defaultValue}
          />
        </div>
        <ModalActionButtons
          confirmButtonType="submit"
          onCancel={closeModal}
          confirmText="Confirmer"
          isLoading={isLoading}
        />
      </form>
    </Modal>
  );
}
