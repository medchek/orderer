"use client";

import React, { ReactElement } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement<SVGElement>;
  text: string;
}

export default function LoginOauthButton(props: Props) {
  return (
    <button
      type="button"
      className="flex h-[60px] w-full space-x-2 rounded-lg bg-neutral-300 font-semibold transition-colors hover:bg-neutral-300/70 active:bg-neutral-400/70 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-900/70"
      {...props}
    >
      <props.icon.type {...props.icon.props} className="h-9 w-9" />
      <span> {props.text}</span>
    </button>
  );
}
