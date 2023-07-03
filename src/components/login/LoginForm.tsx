"use client";
import Image from "next/image";
import React from "react";
import LoginOauthButton from "./LoginOauthButton";
import { MdFacebook } from "react-icons/md";
import { AiFillGoogleCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface Props {}

export default function LoginForm({}: Props) {
  return (
    <section className="flex h-[490px] w-[725px] flex-col justify-between rounded-2xl px-14 py-4 dark:bg-[#08080c] dark:text-white">
      <div className="w-full grow">
        <div
          id="logo"
          className="flex w-full flex-col items-center justify-center"
        >
          <Image
            className="relative"
            src="/trb-logo.png"
            alt="TRB Eshop Logo"
            width={80}
            height={80}
            priority
          />
          <p className="text-center text-sm font-semibold">E-Shop</p>
        </div>
        <div className="mt-7 w-full">
          <h1 className="mb-4 text-2xl font-semibold">Connexion</h1>
          <div className="w-full space-y-4">
            <LoginOauthButton
              icon={<AiFillGoogleCircle />}
              text="Se connecter avec Google"
              onClick={() => signIn("google", { callbackUrl: "/login" })}
            />
            <LoginOauthButton
              icon={<MdFacebook />}
              text="Se connecter avec Facebook"
            />
            <Link
              className="flex h-[60px] w-full items-center justify-center space-x-2 rounded-lg text-[#535663] transition-colors dark:bg-[#101016]  dark:hover:bg-[#14151b] dark:focus:bg-[#0b0b0e]"
              href="./"
            >
              <AiOutlineArrowLeft className="h-6 w-6" />
              <span>Retour à l'acceuil</span>
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center text-[#79797a]">
        Copyright © 2023 TRB Eshop. Made by CHMD
      </p>
    </section>
  );
}
