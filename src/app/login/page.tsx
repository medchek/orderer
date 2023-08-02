import React from "react";

import LoginForm from "@/components/login/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { RedirectType } from "next/dist/client/components/redirect";

export const metadata = {
  title: "Connexion - TRB Eshop",
  description: "Generated by create next app",
};

interface Props {}

export default async function Login({}: Props) {
  const session = await getServerSession(authOptions);

  return !session ? (
    <main className="flex h-screen w-screen items-center justify-center">
      <LoginForm />
      {/* {JSON.stringify(session.user)} */}
    </main>
  ) : session.user?.email === process.env.GOOGLE_ADMIN_EMAIL ? (
    redirect("/dashboard", RedirectType.replace)
  ) : (
    redirect("/", RedirectType.replace)
  );
}
