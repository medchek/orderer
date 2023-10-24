"use client";

import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";
import React from "react";
interface Props {
  pageCount: number;
}

export default function OrdersPagination({ pageCount }: Props) {
  const router = useRouter();

  const handlePageChange = ({ selected }: { selected: number }) => {
    router.push(`?page=${selected}`);
  };
  return (
    <Pagination
      pageCount={pageCount}
      href="?page="
      onPageChange={handlePageChange}
    />
  );
}
