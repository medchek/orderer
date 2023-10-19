"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

interface Props {
  className?: string;
}

export default function BackButton({ className }: Props) {
  const router = useRouter();
  return (
    <button title="Retour" onClick={() => router.back()}>
      <IoMdArrowBack className={cn("h-7 w-7", className)} />
    </button>
  );
}
