import { useStore } from "@/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LuShare2 } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";

interface Props {
  productCode: string;
}

export default function ProductCardDropdown({ productCode }: Props) {
  const { setClipboard } = useStore();
  const host = window.location.host;
  const protocol = window.location.protocol;
  const openCopyCode = () => {
    setClipboard(`${protocol}://${host}/?product=${productCode}`);
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="h-7 w-6 rounded-md outline-none transition-colors hover:bg-neutral-300 dark:text-stone-50 dark:shadow-md dark:hover:bg-stone-800/70 dark:active:bg-neutral-900">
        <MdMoreVert className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        avoidCollisions
        sideOffset={4}
        align="end"
        className="flex flex-col gap-1 rounded-md bg-neutral-100 p-1 text-sm font-semibold outline-none dark:bg-neutral-900"
      >
        <DropdownMenuItem
          className="flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-1 font-normal hover:bg-neutral-200 hover:outline-none dark:hover:bg-neutral-800"
          onClick={openCopyCode}
        >
          {/* <AiOutlineLink className="h-5 w-5" /> <span>Partager</span> */}
          <LuShare2 className="h-5 w-5" /> <span>Partager</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
