"use client";
import React, { type ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SnackProvider from "./SnackProvider";
import AppThemeProvider from "./AppThemeProvider";
import AppImageVisualizerProvider from "./AppImageVisualizerProvider";
import NextTopLoader from "nextjs-toploader";
interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          {children}
          <NextTopLoader color="#397DFF" height={5} showSpinner={false} />
          <SnackProvider />
          <AppImageVisualizerProvider />
          <ReactQueryDevtools initialIsOpen={false} />
        </AppThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
