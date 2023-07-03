"use client";

import React, { ReactElement } from "react";
import { IconType } from "react-icons";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
  text: string;
}

export default function LoginOauthButton(props: Props) {
  return (
    <button
      type="button"
      className="flex h-[60px] w-full space-x-2 rounded-lg font-semibold transition-colors dark:bg-[#17181D]  dark:hover:bg-[#242631] dark:focus:bg-[#0b0b0e]"
      {...props}
    >
      <props.icon.type {...props.icon.props} className="h-9 w-9" />
      <span> {props.text}</span>
    </button>
  );
}
