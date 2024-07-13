"use client";
import { cn } from "@/lib/utils";
import Loader from "./Loader";
import Image from "next/image";
import { BiUser } from "react-icons/bi";
import React from "react";
import { useSession } from "next-auth/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  session: ReturnType<typeof useSession>;
}

export default function AppAccountImage({
  className,
  session,
  ...props
}: Props) {
  const { data, status } = session;
  return (
    <div
      className={cn(
        "relative flex size-10 items-center justify-center overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {status === "loading" && <Loader className="size-6" />}
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
        <div className="flex size-10 items-center justify-center bg-neutral-200 dark:bg-neutral-800">
          <BiUser className="h-6 w-6 text-stone-400" />
        </div>
      )}
    </div>
  );
}
