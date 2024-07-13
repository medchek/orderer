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
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import AppAccountImage from "../AppAccountImage";

interface Props {
  isAdmin?: boolean;
}
export default function AccountActions({ isAdmin }: Props) {
  const session = useSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className="hidden h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 lg:flex"
        disabled={session.status !== "authenticated"}
      >
        <AppAccountImage session={session} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        avoidCollisions
        sideOffset={4}
        align="end"
        className="z-10 flex flex-col gap-1 rounded-md border border-neutral-200 bg-neutral-100 p-1 text-sm text-neutral-800 shadow-lg outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
      >
        {isAdmin && (
          <DropdownMenuItem
            className="flex h-8 rounded-md px-2 hover:bg-neutral-200 hover:outline-none hover:dark:bg-neutral-800"
            title="Gérer l'application"
          >
            <Link
              href="../dashboard/"
              className="flex h-full w-full items-center gap-1"
            >
              <IoGridOutline className="h-5 w-5" /> <span>Administration</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="flex h-8 rounded-md px-2 hover:bg-neutral-200 hover:outline-none hover:dark:bg-neutral-800">
          <Link
            href="../settings/account"
            className="flex h-full w-full items-center gap-1"
          >
            <IoSettingsOutline className="h-6 w-6" /> <span>Paramètres</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 hover:bg-neutral-200 hover:outline-none hover:dark:bg-neutral-800"
          onClick={() => signOut()}
        >
          <IoLogOutOutline className="h-6 w-6" /> <span>Se déconncter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
