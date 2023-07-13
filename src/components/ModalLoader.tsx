import React from "react";
import Modal from "./Modal";
import Loader from "./Loader";

type Props = {};

export default function ModalLoader({}: Props) {
  return (
    <Modal
      closeModal={() => null}
      hideHeader
      label=""
      className="flex h-full items-center justify-center"
    >
      <Loader className="h-10 w-10" />
    </Modal>
  );
}
