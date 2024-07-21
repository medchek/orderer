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

const CategoryCardDropDownMenuItem = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenuItem
      className="flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2 hover:bg-neutral-200 hover:outline-none dark:hover:bg-neutral-800"
      onClick={onClick}
    >
      {children}
    </DropdownMenuItem>
  );
};

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
          "h-8 w-8 rounded-lg text-neutral-950 outline-none transition-colors hover:bg-neutral-300 dark:text-stone-200 dark:shadow-md dark:hover:bg-neutral-800/70 dark:focus:bg-stone-900",
          className,
        )}
      >
        {children ?? <MdMoreVert className="h-7 w-7" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        avoidCollisions
        sideOffset={10}
        align="end"
        className="z-10 flex flex-col gap-1 rounded-lg border bg-neutral-100 p-2 px-2 text-sm text-neutral-600 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
      >
        <CategoryCardDropDownMenuItem onClick={onEditClick}>
          <MdEdit className="h-5 w-5" /> <span>Modifer</span>
        </CategoryCardDropDownMenuItem>
        <CategoryCardDropDownMenuItem onClick={onDeleteClick}>
          <MdDeleteOutline className="h-5 w-5" />
          <span>Supprimer</span>
        </CategoryCardDropDownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
