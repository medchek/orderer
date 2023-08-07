import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { MdDeleteOutline, MdEdit, MdMoreVert } from "react-icons/md";

interface Props {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export default function DashboardCategoryDropdown({
  className,
  title,
  onDeleteClick,
  onEditClick,
  children,
}: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        title={title ?? "éditer ou supprimer"}
        className={cn(
          "dark:focus:bg-stone-900 dark:hover:bg-stone-800/70  transition-colors h-8 w-8 rounded-lg outline-none shadow-md text-stone-50",
          className
        )}
      >
        {children ?? <MdMoreVert className="h-7 w-7" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        avoidCollisions
        sideOffset={10}
        align="end"
        className="flex flex-col gap-1 px-2 z-10 p-2 bg-neutral-900 border border-neutral-800 rounded-lg outline-none text-sm font-semibold"
      >
        <DropdownMenuItem
          className="h-8 hover:bg-neutral-800 flex items-center gap-1.5 px-2 rounded-md hover:outline-none cursor-pointer"
          onClick={onEditClick}
        >
          <MdEdit className="w-5 h-5" /> <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="h-8 hover:bg-neutral-800 flex items-center gap-1.5 px-2 rounded-md hover:outline-none cursor-pointer"
          onClick={onDeleteClick}
        >
          <MdDeleteOutline className="w-5 h-5" />
          <span>Supprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
