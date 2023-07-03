import { signOut, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import Loader from "./Loader";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  className?: string;
}

export default function AccountActions({ className }: Props) {
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const test = async () => {
    const r = fetch("/api/images", { method: "GET" });
  };
  return (
    <div
      id="account-actions"
      className={`relative z-10 h-10 w-10 ${className ? className : "mr-6"}`}
    >
      <button
        type="button"
        className="h-11 w-11 overflow-hidden rounded-full dark:bg-card-dark dark:hover:bg-[#262638]"
        onClick={handleOpenMenu}
      >
        {status === "loading" ? (
          <Loader className="h-6 w-6" />
        ) : (
          <img
            src={data?.user?.image!}
            className="h-9 w-9 rounded-full"
            alt="profile-image"
            loading="lazy"
          />
        )}
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-lg bg-card-dark p-2 text-white shadow-lg"
          ref={ref}
        >
          <button
            type="button"
            className="h-10 w-full justify-start gap-2 rounded-md pl-4 transition-colors hover:bg-white/5"
            onClick={() => signOut()}
          >
            <IoLogOutOutline className="h-7 w-7" /> <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
