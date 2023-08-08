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
  params: {};
  searchParams: { code: string };
}

export default async function ThankYouPage({ searchParams }: Props) {
  const headersMap = headers();
  const orderCode = searchParams.code;
  const host = headersMap.get("host");
  console.log(Array.from(headersMap.entries()));
  const protocol =
    headersMap.get("x-forwarded-proto") ?? (host === "localhost" || "127.0.0.1")
      ? "http"
      : "https";

  if (!host || !orderCode || orderCode.length !== ORDER_CODE_LENGTH) {
    return redirect("/", RedirectType.replace);
  }
  const orderStatusLink = `${protocol}://${host}/orders/${orderCode}`;
  // const orderCode = headersMap.get("x-invoke-query");
  console.log("order=>", host, searchParams.code);
  // if (!orderCode || orderCode.length !== ORDER_CODE_LENGTH) {
  //   console.log(orderCode);
  //   return redirect("/", RedirectType.replace);
  // }

  return (
    <main className="relative flex min-h-screen flex-col px-10 2xl:px-56 dark:text-stone-50">
      <HomeHeader />

      <section className="flex flex-col items-center grow justify-center -translate-y-20">
        <div className="flex flex-col items-center gap-2">
          <TbShoppingBag className="h-20 w-20" />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-5xl font-semibold">Merci</p>
            <p className="font-semibold">
              Votre commande a été enregister avec succès
            </p>
            <p>
              Vous recevrez un appel au numéro fourni pour confirmer la commande
            </p>
            <div className="flex items-center h-10">
              <hr className="w-20 border-stone-800"></hr>
            </div>
            <p className="text-stone-300">
              Vous pouvez à tout moment suivre le statut de la commande en
              visitant le lien
            </p>
            <div className="text-secondary px-4 dark:bg-stone-900 dark:hover:bg-stone-800/90 h-8 flex items-center rounded-md transition-colors">
              <Link
                href={orderStatusLink}
                className="flex items-center gap-2 group"
              >
                <FiLink2 className="w-6 h-6" />
                <span className="group-hover:underline">{orderStatusLink}</span>
              </Link>
            </div>
          </div>
          <Link
            href="/."
            title="Acceuil"
            className="text-stone-700 flex items-center gap-1 mt-6"
          >
            <IoMdArrowBack className="w-7 h-7" />
            <span>Acceuil</span>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
