import React, { useRef, useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import { useStore } from "@/store";
import { LuCheck, LuClipboard } from "react-icons/lu";
import { useCopyToClipboard } from "usehooks-ts";

interface Props {
  text?: string;
  label: string;
  closeModal: () => void;
}

export default function CopyClipboardModal({ closeModal, text, label }: Props) {
  const { clipboard } = useStore();
  const [showCopied, setShowCopied] = useState(false);

  const timeout = useRef<ReturnType<typeof setInterval> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard();
  const handleOnFucus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
  };

  /**
   * Exectues a callback function after the given time and sets the timeout value to the **timeout** Ref
   * @param cb the callback function to execute
   * @param time the time to wait before executing the callback
   * @returns
   */
  const wait = async (cb: () => void, time: number): Promise<void> => {
    return new Promise((resolve) => {
      timeout.current = setTimeout(() => {
        cb();
        resolve;
      }, time);
    });
  };

  /**
   * Clears the timeout from the timeout ref and sets its value to null
   */
  const clearWait = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  };

  const handleButtonClick = async () => {
    // clear anytimeout before (re)running the function
    clearWait();
    copy(clipboard);
    setShowCopied(true);
    await wait(() => {
      setShowCopied(false);
    }, 2000);
    clearWait();
  };

  return (
    <Modal
      id="copy-to-clipboard-modal"
      className="w-[700px] px-2"
      closeModal={closeModal}
      centerModalContent
      closeOnClickOutside
      label={label}
    >
      <div className="px-2 py-2">
        {text && (
          <label
            className="mb-1 block text-sm text-stone-500"
            htmlFor="copy-to-clipboard-input"
          >
            {text}
          </label>
        )}

        <section className="flex items-center justify-between gap-2">
          <Input
            name="copy-to-clipboard"
            id="copy-to-clipboard-input"
            value={clipboard}
            readOnly
            autoFocus
            className="h-10 bg-neutral-300"
            removeErrorHeight
            onFocus={handleOnFucus}
          />
          <button
            type="button"
            title="Copier"
            className="h-10 w-10 min-w-[2.5rem] rounded-md bg-neutral-300 text-neutral-500 ring-secondary hover:ring-2 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-950"
            onClick={handleButtonClick}
          >
            {showCopied ? (
              <LuCheck className="h-6 w-6" />
            ) : (
              <LuClipboard className="h-6 w-6" />
            )}
          </button>
        </section>
      </div>
    </Modal>
  );
}
