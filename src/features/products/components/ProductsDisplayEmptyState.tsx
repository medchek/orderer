import EmptyState from "@/components/dashboard/DashboardEmptyState";
import { useStore } from "@/store";
import React, { useEffect, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import useProductFilter from "../hooks/useProductFilter";
import { MdOutlineFilterAltOff } from "react-icons/md";

interface Props {
  className?: string;
}
export default function ProductsDisplayEmptyState({ className }: Props) {
  const { productsFilters } = useStore();
  const { resetFilters } = useProductFilter();

  const [hasFilters, setHasFilters] = useState<boolean>(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentPage: _, ...rest } = productsFilters;
    setHasFilters(!!Object.keys(rest).length);
  }, [productsFilters]);
  return (
    <EmptyState
      className={className}
      noTranslate
      Icon={<BsBoxSeam className="size-16" />}
      text={
        hasFilters
          ? "Aucun produit ne correspond aux filtres appliqués"
          : "Aucun produit n'a été encore ajouté"
      }
      subContent={
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-1 rounded-lg px-2 font-semibold transition-colors dark:hover:bg-stone-900 dark:focus:bg-stone-900/70"
          onClick={resetFilters}
        >
          {hasFilters ? <MdOutlineFilterAltOff className="h-6 w-6" /> : null}
          {hasFilters ? "Réinitialiser les filtres" : null}
        </button>
      }
    />
  );
}
