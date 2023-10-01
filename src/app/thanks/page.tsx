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

// search param
interface Props {
  searchParams: { code: string };
}

export default async function ThankYouPage({ searchParams }: Props) {
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
  // const orderCode = headersMap.get("x-invoke-query");
  // if (!orderCode || orderCode.length !== ORDER_CODE_LENGTH) {
  //   console.log(orderCode);
  //   return redirect("/", RedirectType.replace);
  // }

  return (
    <main className="relative flex min-h-screen flex-col px-10 dark:text-stone-50 2xl:px-56">
      <HomeHeader />

      <section className="flex grow -translate-y-20 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <TbShoppingBag className="h-20 w-20" />
          <div className="flex flex-col items-center gap-1">
            <p className="text-5xl font-semibold">Merci</p>
            <p className="font-semibold">
              Votre commande a été enregister avec succès
            </p>
            <p>
              Vous recevrez un appel au numéro fourni pour confirmer la commande
            </p>
            <div className="flex h-10 items-center">
              <hr className="w-20 border-stone-800"></hr>
            </div>
            <p className="text-stone-300">
              Vous pouvez à tout moment suivre le statut de la commande en
              visitant le lien
            </p>
            <div className="flex h-8 items-center rounded-md px-4 text-secondary transition-colors dark:bg-stone-900 dark:hover:bg-stone-800/90">
              <Link
                href={orderStatusLink}
                className="group flex items-center gap-2"
              >
                <FiLink2 className="h-6 w-6" />
                <span className="group-hover:underline">{orderStatusLink}</span>
              </Link>
            </div>
          </div>
          <Link
            href="/."
            title="Acceuil"
            className="mt-6 flex items-center gap-1 text-stone-700"
          >
            <IoMdArrowBack className="h-7 w-7" />
            <span>Acceuil</span>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
