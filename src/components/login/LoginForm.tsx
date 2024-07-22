"use client";
import Image from "next/image";
import React from "react";
import LoginOauthButton from "./LoginOauthButton";
import { MdFacebook } from "react-icons/md";
import { AiFillGoogleCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  return (
    <section className="flex h-[490px] w-[725px] flex-col justify-between rounded-2xl px-4 py-4 text-neutral-900 dark:text-white sm:px-6 md:bg-neutral-200 md:px-8 md:dark:bg-neutral-950 lg:px-14">
      <div className="w-full grow">
        <div
          id="logo"
          className="flex w-full flex-col items-center justify-center"
        >
          <div className="relative size-16">
            <Image
              className="relative"
              src="/trb-logo.png"
              alt="TRB Eshop Logo"
              fill
              priority
            />
          </div>
          <p className="text-center text-sm font-semibold">E-Shop</p>
        </div>
        <div className="mt-7 w-full">
          <h1 className="mb-4 text-xl font-semibold">Connexion</h1>
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
              className="flex h-[60px] w-full items-center justify-center space-x-2 rounded-lg text-neutral-600 transition-colors hover:bg-neutral-300 focus:bg-neutral-400/70 focus:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900/70"
              href="./"
            >
              <AiOutlineArrowLeft className="size-6" />
              <span>Retour à l&apos;accueil</span>
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-neutral-500">
        Copyright © {new Date().getFullYear()} TRB Eshop. Made by CHMD
      </p>
    </section>
  );
}
