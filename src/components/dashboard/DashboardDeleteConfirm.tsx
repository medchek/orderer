import React, { useState } from "react";
import Modal from "../Modal";
import Loader from "../Loader";
import { STATUS_OK } from "@/lib/constants";
import { useStore } from "@/store";

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
}

export default function DashboardDeleteConfirm({
  closeModal,
  onConfirm,
  text,
  isLoading,
  label,
}: Props) {
  return (
    <Modal
      closeModal={closeModal}
      // label="Supprimer un produit"
      label={label}
      className="flex w-[700px] flex-col rounded-lg  bg-[#F3F3F3] px-6 py-3 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      centerModalContent
    >
      <p className="px-2 py-2 text-stone-400">
        {/* Êtes-vous sûr de vouloir supprimer ce produit? */}
        {text}
      </p>

      <section
        id="form-buttons"
        className="flex items-center justify-end gap-4 py-4"
      >
        <button
          type="button"
          className="h-10 w-36 rounded-md font-bold transition-colors dark:bg-white/10 dark:text-stone-400 dark:hover:bg-white/[0.15] dark:focus:bg-white/5"
          onClick={closeModal}
          disabled={isLoading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="h-10 w-36 rounded-md bg-red-600 font-bold text-white transition-colors hover:bg-red-500 focus:bg-red-700 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-400 disabled:dark:bg-stone-600"
          onClick={onConfirm}
          // disabled
          disabled={isLoading}
        >
          {isLoading ? <Loader className="h-6 w-6" /> : <span>Supprimer</span>}
        </button>
      </section>
    </Modal>
  );
}
