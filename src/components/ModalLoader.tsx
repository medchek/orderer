import React from "react";
import Modal from "./Modal";
import Loader from "./Loader";

export default function ModalLoader() {
  return (
    <Modal
      closeModal={() => null}
      hideHeader
      label=""
      className="flex h-full items-center justify-center"
      transparent
    >
      <Loader className="h-10 w-10" />
    </Modal>
  );
}
