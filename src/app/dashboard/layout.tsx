// import AuthProvider from "@/components/AuthProvider";
import DashboardNav from "@/components/dashboard/DashboardNav";
import React from "react";
import AuthProvider from "@/components/AuthProvider";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: Props) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.email === process.env.GOOGLE_ADMIN_EMAIL;

  return isAdmin ? (
    <main id="dashboard" className="flex h-screen w-screen">
      <DashboardNav />
      <DashboardContent>
        {/* TOOLS */}
        <AuthProvider>{children}</AuthProvider>
      </DashboardContent>
    </main>
  ) : (
    redirect("/")
  );
}
