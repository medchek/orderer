"use client"
import React, { type ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
