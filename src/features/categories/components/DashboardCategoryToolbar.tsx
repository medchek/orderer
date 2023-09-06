import React from "react";
import {
  MdAdd,
  MdCheck, MdOutlineManageSearch
} from "react-icons/md";

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
      className="flex h-16 min-h-[4rem] w-full items-center justify-between "
    >
      <button
        type="button"
        className="px-2 h-10 bg-blue-600 rounded-lg text-stone-50 font-semibold hover:bg-secondary focus:bg-blue-700 transition-colors"
        onClick={openAddCategory}
      >
        <MdAdd className="w-7 h-7" /> Ajouter une catégorie
      </button>
      <div className="flex gap-2 h-10">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            title="Filtrer par"
            className="dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-950  transition-colors h-10 w-10 rounded-lg outline-none shadow-md text-stone-400 flex items-center justify-center"
          >
            {/* <MdOutlineFilterList className="h-7 w-7" /> */}
            <MdOutlineManageSearch className="h-7 w-7" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            avoidCollisions
            sideOffset={10}
            align="end"
            className="flex flex-col gap-1 px-2 z-10 p-2 bg-neutral-900 border border-neutral-800 rounded-lg outline-none text-sm text-neutral-200"
          >
            <DropdownMenuLabel className="px-2 text-stone-500">
              Chercher par
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="h-8 hover:bg-neutral-800 flex items-center gap-1.5 px-2 rounded-md hover:outline-none cursor-pointer"
              onClick={() => setCategoryFilterType("category")}
            >
              <span className="w-28">Catégorie</span>{" "}
              {categoryFilterType === "category" && (
                <MdCheck className="w-5 h-5" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="h-8 hover:bg-neutral-800 flex items-center gap-1.5 px-2 rounded-md hover:outline-none cursor-pointer"
              onClick={() => setCategoryFilterType("subcategory")}
            >
              <span className="w-28">Sous-catégorie</span>
              {categoryFilterType === "subcategory" && (
                <MdCheck className="w-5 h-5" />
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
