import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="flex h-10 w-full items-center justify-center">
      <p className="text-[#9e9e9e]">
        Copyright © {new Date().getFullYear()} TRB Eshop. Made by CHMD
      </p>
    </footer>
  );
}
