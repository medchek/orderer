import Modal from "../Modal";
import ModalActionButtons from "../ModalActionButtons";

interface Props {
  label: string;
  text: string;
  closeModal: () => void;
  isLoading?: boolean;
  /**
   * The function to execute upon clicking the delete button.
   * This is usually the api DELETE request
   */
  onConfirm: () => void;
  confirmButtonText?: string;
}

export default function DashboardDeleteConfirm({
  closeModal,
  onConfirm,
  text,
  isLoading,
  label,
  confirmButtonText,
}: Props) {
  return (
    <Modal
      closeModal={closeModal}
      closeOnClickOutside
      // label="Supprimer un produit"
      label={label}
      className="flex w-[700px] flex-col rounded-lg bg-[#F3F3F3] px-4 py-3 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      centerModalContent
    >
      <div className="px-2">
        <p className="py-2 text-neutral-600 dark:text-neutral-400">
          {/* Êtes-vous sûr de vouloir supprimer ce produit? */}
          {text}
        </p>

        <ModalActionButtons
          confirmText={confirmButtonText ? confirmButtonText : "Supprimer"}
          isLoading={isLoading}
          confirmButtonType="submit"
          disableSubmit={isLoading}
          disableCancel={isLoading}
          onConfirm={onConfirm}
          onCancel={closeModal}
          confirmClassName="bg-red-600 hover:bg-red-500 active:bg-red-700"
        />
      </div>
    </Modal>
  );
}
