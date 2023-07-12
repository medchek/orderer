// import AuthProvider from "@/components/AuthProvider";
import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardProductDisplay from "@/components/dashboard/DashboardProductsDisplay";
import { DashboardProductsToolbar } from "@/components/dashboard/DashboardProductsToolbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AuthProvider from "@/components/AuthProvider";
import DashboardContent from "@/components/dashboard/DashboardContent";

type Props = {};

export default async function Dashboard({}: Props) {
  const session = await getServerSession(authOptions);

  return session ? (
    session.user?.email === process.env.GOOGLE_ADMIN_EMAIL ? (
      <main id="dashboard" className="flex h-screen w-screen">
        <DashboardNav />
        <DashboardContent>
          {/* TOOLS */}
          <AuthProvider>
            <DashboardProductsToolbar />

            <DashboardProductDisplay />
          </AuthProvider>
        </DashboardContent>
      </main>
    ) : (
      redirect("/")
    )
  ) : (
    redirect("/login")
  );
}
