"use client";
import { useSession, signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";
import Loader from "./Loader";
import Image from "next/image";
import { DropdownMenu } from "./ui/Dropdown";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { BiUser } from "react-icons/bi";
import Link from "next/link";

export default function AccountActions() {
  const { data, status } = useSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full dark:bg-neutral-900 dark:hover:bg-neutral-800"
        disabled={status !== "authenticated"}
      >
        <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full">
          {status === "loading" && <Loader className="h-6 w-6" />}
          {status === "authenticated" && (
            <Image
              unoptimized
              fill
              src={
                data?.user?.image ??
                "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              }
              className="relative rounded-full object-cover object-center"
              alt="profile image"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          )}
          {status === "unauthenticated" && (
            <Link href="/login" className="w-full h-full flex items-center justify-center">
              <BiUser className="h-6 w-6 text-stone-400" />
            </Link>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        avoidCollisions
        sideOffset={4}
        align="end"
        className="z-10 flex flex-col gap-1 rounded-md border border-neutral-800 bg-neutral-900 p-1 text-sm text-stone-400 outline-none"
      >
        <DropdownMenuItem
          className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 hover:bg-neutral-800 hover:outline-none"
          onClick={() => signOut()}
        >
          <IoLogOutOutline className="h-6 w-6" /> <span>Se déconncter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
