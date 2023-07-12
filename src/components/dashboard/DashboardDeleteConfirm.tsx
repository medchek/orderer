"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import Loader from "../Loader";
import { STATUS_OK } from "@/lib/constants";
import { useStore } from "@/store";

interface Props {
  closeModal: () => void;
  productCode: string | null;
}

export default function DashboardDeleteConfirm({
  closeModal,
  productCode,
}: Props) {
  const { showSnackbar, deleteProduct: removeProductByCode } = useStore();
  const [isSubbmitting, setIsSubbmitting] = useState(false);
  const handleDeleteProduct = async () => {
    if (!productCode) return;
    setIsSubbmitting(true);
    try {
      const response = await fetch(`/api/products/${productCode}`, {
        method: "DELETE",
      });
      if (response.status === STATUS_OK) {
        console.log("code:", productCode);
        removeProductByCode(productCode);
        showSnackbar("Produit supprimé!", "success");
        closeModal();
      } else {
        const content = await response.json();
        throw { response: response.status, content };
      }
    } catch (e) {
      console.error("Error while deleting product:", e);
      showSnackbar(
        "Une Erreur est survenu lors la suppression du produit, veuillez réessayer!",
        "error"
      );
    } finally {
      setIsSubbmitting(false);
    }
  };
  return (
    <Modal
      closeModal={closeModal}
      label="Supprimer un produit"
      className="flex w-[700px] flex-col rounded-lg  bg-[#F3F3F3] px-6 py-3 shadow-md dark:bg-[#040404] dark:[color-scheme:dark]"
      centerModalContent
    >
      <p className="px-2 py-2 text-stone-400">
        Êtes-vous sûr de vouloir supprimer ce produit?
      </p>

      <section
        id="form-buttons"
        className="flex items-center justify-end gap-4 py-4"
      >
        <button
          type="button"
          className="h-10 w-36 rounded-md font-bold transition-colors dark:bg-white/10 dark:text-stone-400 dark:hover:bg-white/[0.15] dark:focus:bg-white/5"
          onClick={closeModal}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="h-10 w-36 rounded-md bg-red-600 font-bold text-white transition-colors hover:bg-red-500 focus:bg-red-700 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-400 disabled:dark:bg-stone-600"
          onClick={handleDeleteProduct}
          // disabled
          disabled={isSubbmitting}
        >
          {isSubbmitting ? (
            <Loader className="h-6 w-6" />
          ) : (
            <span>Supprimer</span>
          )}
        </button>
      </section>
    </Modal>
  );
}
