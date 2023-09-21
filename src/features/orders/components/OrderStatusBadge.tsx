import React from "react";

interface Props {
  text: string;
  type?: "unconfirmed" | "confirmed" | "completed";
}

export default function OrderStatusBadge({ text }: Props) {
  return (
    <div className="h-8 px-2 flex items-center justify-center bg-stone-800 text-stone-50 rounded-md">
      {text}
    </div>
  );
}
