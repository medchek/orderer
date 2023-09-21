import Loader from "@/components/Loader";
import { useStore } from "@/store";
import { Status } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { BsPersonSlash } from "react-icons/bs";
import { FiHexagon } from "react-icons/fi";
import { MdCheck, MdDeleteOutline, MdMoreVert } from "react-icons/md";

type StatusState = {
  value: string;
  displayText: string;
  selected: boolean;
  isLoading: boolean;
};

interface Props {
  orderData: {
    code: string;
    userPhone: string;
    isPhoneBlocked: boolean;
  };
  onUpdateStatus: UseMutateAsyncFunction<
    {
      code: string;
      status: Status;
    },
    unknown,
    {
      code: string;
      status: Status;
    },
    unknown
  >;
  isLoading: boolean;
  currentStatus: Status;
}

export default function DashboardOrdersCardDropdown({
  orderData,
  currentStatus,
  onUpdateStatus,
  isLoading,
}: Props) {
  const { setOrderCodeToDelete, setOrderPhoneToBlock } = useStore();
  const [statusList, setStatusList] = useState<{
    // eslint-disable-next-line no-unused-vars
    [key in Status]: StatusState;
  }>({
    UNCONFIRMED: {
      value: Status.UNCONFIRMED,
      displayText: "Non confirmée",
      selected: currentStatus === Status.UNCONFIRMED,
      isLoading: false,
    },
    CONFIRMED: {
      value: Status.CONFIRMED,
      displayText: "Confirmée",
      selected: currentStatus === Status.CONFIRMED,
      isLoading: false,
    },
    SHIPPING: {
      value: Status.SHIPPING,
      displayText: "En livraison",
      selected: currentStatus === Status.SHIPPING,
      isLoading: false,
    },
    SUCCESS: {
      value: Status.SUCCESS,
      displayText: "Complétée",
      selected: currentStatus === Status.SUCCESS,
      isLoading: false,
    },
    RETURNED: {
      value: Status.RETURNED,
      displayText: "Retournée",
      selected: currentStatus === Status.RETURNED,
      isLoading: false,
    },
    CANCELED: {
      value: Status.CANCELED,
      displayText: "Annulée",
      selected: currentStatus === Status.CANCELED,
      isLoading: false,
    },
  });

  const displayStatusButtons = () => {
    const statusListKeys = Object.keys(statusList) as Array<
      keyof typeof Status
    >;

    return statusListKeys.map((statusKey) => (
      <DropdownMenuItem
        className="hover:outline-none flex justify-between items-center gap-2 px-2 h-7 transition-colors hover:bg-neutral-800 rounded-md cursor-pointer disabled:cursor-not-allowed"
        key={statusKey}
        disabled={isLoading}
        onClick={() => handleOnStatusClick(statusKey)}
      >
        <span
          className={clsx("h-full flex items-center", {
            "text-neutral-400": statusKey === Status.UNCONFIRMED,
            "text-blue-500": statusKey === Status.CONFIRMED,
            "text-teal-400": statusKey === Status.SHIPPING,
            "text-emerald-500": statusKey === Status.SUCCESS,
            "text-red-500": statusKey === Status.CANCELED,
            "text-rose-700": statusKey === Status.RETURNED,
          })}
        >
          {statusList[statusKey].displayText}
        </span>
        <span className="w-5 max-w-[1.25rem]">
          {statusList[statusKey].selected && <MdCheck className="w-5 h-5" />}
          {statusList[statusKey].isLoading && (
            <Loader className="w-4 h-4 border-neutral-600" />
          )}
        </span>
      </DropdownMenuItem>
    ));
  };

  const handleOnStatusClick = async (newStatus: Status) => {
    if (newStatus === currentStatus) return;
    // start loading the target new status
    setStatusList((prev) => ({
      ...prev,
      [newStatus]: {
        ...prev[newStatus],
        isLoading: true,
      },
    }));
    try {
      await onUpdateStatus({ code: orderData.code, status: newStatus });
      setStatusList((prev) => ({
        ...prev,
        // upon succes, the current status should no longer be selected
        [currentStatus]: {
          ...prev[currentStatus],
          selected: false,
        },
        // instead, the new status should be
        [newStatus]: {
          ...prev[newStatus],
          isLoading: false,
          selected: true,
        },
      }));
    } catch (_) {
      // in case of an error, stop loading
      setStatusList((prev) => ({
        ...prev,
        [newStatus]: {
          ...prev[newStatus],
          isLoading: false,
        },
      }));
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        title="Options"
        className="dark:focus:bg-stone-900 dark:hover:bg-stone-800/70  transition-colors h-8 w-8 rounded-lg outline-none shadow-md text-stone-50"
      >
        {<MdMoreVert className="h-7 w-7" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        avoidCollisions
        sideOffset={10}
        align="end"
        className="flex flex-col gap-1 px-2 py-1 z-10 border border-neutral-800 rounded-lg outline-none text-sm bg-neutral-900"
      >
        <DropdownMenuLabel className="flex gap-1 pl-2 h-7 items-center">
          <FiHexagon className="w-5 h-5" />
          <span>Statut</span>
        </DropdownMenuLabel>
        {displayStatusButtons()}

        <hr className="border-neutral-800" />
        {!orderData.isPhoneBlocked && (
          <DropdownMenuItem
            className="h-7 flex items-center gap-1 px-2 hover:bg-neutral-800 rounded-md hover:outline-none cursor-pointer"
            onClick={() => {
              // close the code to delete component if it's open
              setOrderCodeToDelete(null);
              setOrderPhoneToBlock(orderData.userPhone);
            }}
          >
            <BsPersonSlash className="w-5 h-5" />
            <span>Bloquer ce numéro</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="h-7 flex items-center gap-1 px-2 hover:bg-neutral-800 rounded-md hover:outline-none cursor-pointer"
          onClick={() => {
            // close the block phone component if it's open
            setOrderPhoneToBlock(null);
            setOrderCodeToDelete(orderData.code);
          }}
        >
          <MdDeleteOutline className="w-5 h-5" />
          <span>Supprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
