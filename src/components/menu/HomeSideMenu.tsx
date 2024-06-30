"use client";
import { IconType } from "react-icons";
import AppLogo from "../AppLogo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";
import Link from "next/link";
import { TbMenuDeep, TbSettings } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { BsBoxSeam, BsListNested } from "react-icons/bs";
import AppAccountImage from "../AppAccountImage";
import { signOut, useSession } from "next-auth/react";
import HeaderSelectedProductsCounter from "../home/HeaderSelectedProductsCounter";
import { ReactNode } from "react";

// const LazySheetContent = dynamic(
//   () => import("../ui/Sheet").then((cmp) => cmp.SheetContent),
//   {
//     loading: () => <ModalLoader />,
//     ssr: false,
//   },
// );

type MenuItemsData = {
  Icon: IconType;
  text: string;
  href: string;
  onClick?: () => void;
  Suffix?: ReactNode;
}[];

// TODO: Lazy loading

export default function HomeSideMenu() {
  const sessionData = useSession();

  const menuItemsData: MenuItemsData = [
    {
      href: "..",
      text: "Commander",
      Icon: AiOutlineShoppingCart,
      Suffix: <HeaderSelectedProductsCounter className="size-6" />,
    },
    { href: "/products", text: "Produits", Icon: BsBoxSeam },
    ...(sessionData.status === "authenticated"
      ? [
          { href: "/orders", text: "Mes Commandes", Icon: BsListNested },

          { href: "/settings/account", text: "Paramètres", Icon: TbSettings },
          {
            href: "#",
            text: "Se déconnecter",
            Icon: LuLogOut,
            onClick: signOut,
          },
        ]
      : [
          {
            href: "/login",
            text: "Se connecter",
            Icon: LuLogIn,
          },
        ]),
  ];

  const displayMenuItems = menuItemsData.map(
    ({ Icon, text, href, onClick, Suffix }) => (
      <Link
        key={text}
        className="flex h-12 w-full items-center justify-between rounded-md px-2 focus:dark:bg-neutral-800 focus:dark:text-neutral-50"
        href={href}
        onClick={onClick}
      >
        <span className="flex w-full items-center gap-5">
          <Icon className="size-6" />
          <span className="font-medium">{text}</span>
        </span>
        {Suffix}
      </Link>
    ),
  );

  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <button>
          <TbMenuDeep className="size-8" />
        </button>
      </SheetTrigger>
      <SheetContent
        autoFocus={false}
        className="flex w-[80%] flex-col rounded-l-lg border-none bg-neutral-950 px-4 py-4"
        side="left"
      >
        <SheetHeader>
          <SheetTitle>
            <div className="relative size-12">
              <AppLogo />
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full w-full flex-col justify-between pt-6">
          <div className="flex grow flex-col gap-2 text-neutral-300">
            {displayMenuItems}
          </div>

          <div
            id="menu-account-display"
            className="flex h-16 min-h-16 w-full items-center justify-between rounded-md bg-neutral-900 px-4"
          >
            <div className="flex items-center gap-4">
              <AppAccountImage session={sessionData} />
              <span>{sessionData.data?.user?.name}</span>
            </div>
            {sessionData.status === "authenticated" ? (
              <button
                type="button"
                className="size-9 rounded-md active:dark:bg-neutral-950"
                title="Se déconnecter"
              >
                <LuLogOut className="size-6" />
              </button>
            ) : (
              <Link
                className="flex size-9 items-center justify-center rounded-md active:dark:bg-neutral-950"
                title="Se connecter"
                href="/login"
              >
                <LuLogIn className="size-6" />
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
