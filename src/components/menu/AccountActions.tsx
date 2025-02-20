"use client";
import { useSession, signOut } from "next-auth/react";
import {
  IoGridOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { DropdownMenu } from "../ui/Dropdown";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  type DropdownMenuItemProps,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import AppAccountImage from "../AppAccountImage";
import ThemeSelectInput from "./ThemeSelectInput";
import { LuLogIn } from "react-icons/lu";

interface Props {
  isAdmin?: boolean;
}

interface SubComponentProps
  extends DropdownMenuItemProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {}

const AccountDropdownMenuItem = ({ children, ...props }: SubComponentProps) => {
  return (
    <DropdownMenuItem
      className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 hover:bg-neutral-200 hover:outline-hidden dark:hover:bg-neutral-800"
      {...props}
    >
      {children}
    </DropdownMenuItem>
  );
};

export default function AccountActions({ isAdmin }: Props) {
  const session = useSession();

  const isLogged = session && session.status === "authenticated";

  const menuItems = () => {
    if (isLogged) {
      return (
        <>
          {isAdmin ? (
            <AccountDropdownMenuItem title="Gérer l'application">
              <Link
                href="../dashboard/"
                className="flex h-full w-full items-center gap-1"
              >
                <IoGridOutline className="h-5 w-5" />{" "}
                <span>Administration</span>
              </Link>
            </AccountDropdownMenuItem>
          ) : null}
          <AccountDropdownMenuItem>
            <Link
              href="../settings/account"
              className="flex h-full w-full items-center gap-1"
            >
              <IoSettingsOutline className="h-6 w-6" /> <span>Paramètres</span>
            </Link>
          </AccountDropdownMenuItem>

          <AccountDropdownMenuItem onClick={() => signOut()}>
            <IoLogOutOutline className="h-6 w-6" /> <span>Se déconnecter</span>
          </AccountDropdownMenuItem>
        </>
      );
    } else {
      return (
        <AccountDropdownMenuItem>
          <Link
            href="../login"
            className="flex h-full w-full items-center gap-1"
          >
            <LuLogIn className="size-6" /> <span>Se connecter</span>
          </Link>
        </AccountDropdownMenuItem>
      );
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className="hidden size-11 items-center justify-center overflow-hidden rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 lg:flex"
        // disabled={session.status !== "authenticated"}
      >
        {/* {session.status === "unauthenticated" ? (
          <Link href="/login" title="Se connecter">
            <AppAccountImage session={session} />
          </Link>
        ) : ( */}
        <AppAccountImage session={session} />
        {/* )} */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        avoidCollisions
        sideOffset={4}
        align="end"
        className="z-10 flex flex-col gap-1 rounded-md border border-neutral-200 bg-neutral-100 p-1 text-sm text-neutral-800 shadow-lg outline-hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
      >
        {menuItems()}
        {/*  */}
        <DropdownMenuSeparator />
        {/*  */}
        <hr className="mx-2 border-neutral-200 dark:border-neutral-800" />
        <div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:outline-hidden">
          <label htmlFor="theme-selector-dropdown-menu">Thème</label>
          <ThemeSelectInput
            id="theme-selector-dropdown-menu"
            className="h-8 w-28 dark:bg-neutral-800"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
