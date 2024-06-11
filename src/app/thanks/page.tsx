import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import Link from "next/link";
import React from "react";
import { TbShoppingBag } from "react-icons/tb";
import { FiLink2 } from "react-icons/fi";

import { headers } from "next/headers";
import { IoMdArrowBack } from "react-icons/io";
import { redirect } from "next/navigation";
import { ORDER_CODE_LENGTH } from "@/lib/constants";
import { RedirectType } from "next/dist/client/components/redirect";
import { getSession } from "../api/auth/[...nextauth]/route";
import Main from "@/components/Main";

// search param
interface Props {
  searchParams: { code: string };
}

export default async function ThankYouPage({ searchParams }: Props) {
  const session = await getSession();
  const isAdmin = session?.user?.email === process.env.GOOGLE_ADMIN_EMAIL;

  const headersMap = headers();
  const orderCode = searchParams.code;
  const host = headersMap.get("host");
  const protocol =
    headersMap.get("x-forwarded-proto") ?? (host === "localhost" || "127.0.0.1")
      ? "http"
      : "https";

  if (!host || !orderCode || orderCode.length !== ORDER_CODE_LENGTH) {
    return redirect("/", RedirectType.replace);
  }
  const orderStatusLink = `${protocol}://${host}/orders/${orderCode}`;

  return (
    <Main>
      <HomeHeader isAdmin={isAdmin} />

      <div className="relative flex grow -translate-y-20 flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-2 ">
          <TbShoppingBag className="h-20 w-20" />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-5xl font-semibold">Merci</p>
            <p className="font-semibold">
              Votre commande a été enregister avec succès
            </p>
            <p>
              Vous recevrez un appel au numéro fourni pour confirmer la commande
            </p>
            <div className="flex h-10 items-center">
              <hr className="w-20 border-neutral-800"></hr>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-300 lg:text-base">
              Vous pouvez à tout moment suivre le statut de votre commande en
              visitant le lien
            </p>
            <div className="flex h-8 items-center rounded-md bg-neutral-200 px-4 text-secondary transition-colors hover:bg-neutral-200/50 dark:bg-neutral-900 dark:hover:bg-neutral-800/90">
              <Link
                href={orderStatusLink}
                className="group flex max-w-full items-center gap-2 overflow-hidden text-sm lg:text-base"
              >
                <FiLink2 className="h-6 w-6" />
                <span className="group-hover:underline">
                  <span className="hidden lg:inline-block">
                    {orderStatusLink}
                  </span>
                  <span className="inline-block lg:hidden">
                    Voir la commande
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <Link
            href="/."
            title="Acceuil"
            className="mt-6 flex items-center gap-1 text-neutral-700"
          >
            <IoMdArrowBack className="h-7 w-7" />
            <span>Acceuil</span>
          </Link>
        </div>
      </div>
      <Footer />
    </Main>
  );
}
