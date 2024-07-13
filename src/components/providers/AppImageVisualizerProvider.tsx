"use client";
import dynamic from "next/dynamic";
import React from "react";
import ModalLoader from "../ModalLoader";
import { useStore } from "@/store";

const ImageVisualizer = dynamic(() => import("../AppImageVisualizer"), {
  loading: () => <ModalLoader />,
});

export default function AppImageVisualizerProvider() {
  const { imageVisualizerIds } = useStore();
  return imageVisualizerIds !== null ? <ImageVisualizer /> : null;
}
