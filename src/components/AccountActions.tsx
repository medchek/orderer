"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import Loader from "./Loader";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";

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

  const buttonContent = () => {
    if (status === "loading") {
      return (
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full dark:bg-card-dark">
          <Loader className="h-6 w-6" />
        </div>
      );
    } else if (status === "unauthenticated") {
      return (
        <Link
          type="button"
          className="relative z-10 flex h-9 w-auto items-center justify-center rounded-lg px-2 text-[#535663] transition-colors dark:bg-[#101016]  dark:hover:bg-[#14151b] dark:focus:bg-[#0b0b0e]"
          href="/login"
          title="Se connecter"
        >
          <span>connexion</span>
          {/* <IoLogInOutline className="h-7 w-7" /> */}
        </Link>
      );
    } else {
      return (
        <button
          type="button"
          className="h-11 w-11 overflow-hidden rounded-full dark:bg-card-dark dark:hover:bg-[#262638]"
          onClick={handleOpenMenu}
          disabled={status !== "authenticated"}
        >
          <img
            src={data?.user?.image!}
            className="h-9 w-9 rounded-full"
            alt="profile-image"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </button>
      );
    }
  };

  return (
    <div
      id="account-actions"
      className={`relative z-10 h-10 w-auto ${className && className}`}
    >
      {buttonContent()}

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
