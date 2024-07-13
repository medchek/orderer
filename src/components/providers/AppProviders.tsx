"use client";
import React, { type ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SnackProvider from "./SnackProvider";
import AppThemeProvider from "./AppThemeProvider";
import AppImageVisualizerProvider from "./AppImageVisualizerProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          {children}
          <ProgressBar color="#397DFF" height="6px" />
          <SnackProvider />
          <AppImageVisualizerProvider />
          <ReactQueryDevtools initialIsOpen={false} />
        </AppThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
