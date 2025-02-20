import React from "react";
import { MdCheck, MdOutlineManageSearch } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useStore } from "@/store";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";
import DashboardToolbarAddButton from "@/components/dashboard/DashboardToolbarAddButton";

interface Props {
  openAddCategory: () => void;
}

export default function DashboardCategoryToolbar({ openAddCategory }: Props) {
  const {
    setCategoryFilterTerm,
    setCategoryFilterType,
    categoryFilterType,
    categoryFilterTerm,
  } = useStore();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCategoryFilterTerm(value);
  };

  return (
    <div
      id="categories-toolbar"
      className="flex h-16 min-h-[4rem] w-full items-center justify-between"
    >
      <DashboardToolbarAddButton
        onClick={openAddCategory}
        text="Ajouter une catégorie"
      />

      <div className="flex h-10 gap-2">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            title="Filtrer par"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-200 text-stone-400 outline-hidden transition-colors hover:bg-neutral-300 dark:bg-neutral-900 dark:shadow-md dark:hover:bg-neutral-800 dark:focus:bg-neutral-950"
          >
            {/* <MdOutlineFilterList className="h-7 w-7" /> */}
            <MdOutlineManageSearch className="size-7" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            avoidCollisions
            sideOffset={10}
            align="end"
            className="bg- z-10 flex flex-col gap-1 rounded-lg border bg-neutral-100 p-2 px-2 text-sm text-neutral-600 outline-hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
          >
            <DropdownMenuLabel className="px-2 text-stone-400">
              Chercher par
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2 hover:bg-neutral-200 hover:outline-hidden dark:hover:bg-neutral-800"
              onClick={() => setCategoryFilterType("category")}
            >
              <span className="w-28">Catégorie</span>{" "}
              {categoryFilterType === "category" && (
                <MdCheck className="h-5 w-5" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2 hover:bg-neutral-200 hover:outline-hidden dark:hover:bg-neutral-800"
              onClick={() => setCategoryFilterType("subcategory")}
            >
              <span className="w-28">Sous-catégorie</span>
              {categoryFilterType === "subcategory" && (
                <MdCheck className="h-5 w-5" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DashboardSearchInput
          placeholder={`Chercher une ${
            categoryFilterType === "category" ? "catégorie" : "sous-catégorie"
          }`}
          onChange={handleOnChange}
          value={categoryFilterTerm}
        />
      </div>
    </div>
  );
}
