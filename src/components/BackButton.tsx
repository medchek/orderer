"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

interface Props {
  className?: string;
}

export default function BackButton({ className }: Props) {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length <= 1) {
      router.push("/");
    } else {
      router.back();
    }
  };
  return (
    <button title="Retour" onClick={goBack}>
      <IoMdArrowBack className={cn("h-7 w-7", className)} />
    </button>
  );
}
