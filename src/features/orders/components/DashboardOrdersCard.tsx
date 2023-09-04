
import {
  MdLocationPin,
  MdOutlineDateRange,
  MdOutlineLocationOn,
  MdOutlineMapsHomeWork,
} from "react-icons/md";
import { addPartitive, discountedPrice, formatDate } from "@/lib/utils";
import DashboardOrderCardDropdown from "./DashboardOrdersCardDropdown";
import DashboardOrderStatusBadge from "./DashboardOrdersStatusBadge";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { Status } from "@prisma/client";
import { IoWarning } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { OrderData } from "../types";

// GetAllOrdersSuccessResponsePayload represents a single order data schema
interface Props extends OrderData {
  updateStatus: UseMutateAsyncFunction<
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
  isPatching: boolean;
  patchingCode?: string;
}

export default function DashboardOrdersCard({
  code,
  user,
  address,
  createdAt,
  isHome,
  orderProducts,
  status,
  wilaya,
  town,
  updateStatus,
  isPatching,
  patchingCode,
}: Props) {
  const totalPrice = () => {
    const productsPrice = orderProducts.reduce((prev, { product }) => {
      return prev + discountedPrice(product.price, product.discount);
    }, 0);

    const shippingPrice = isHome ? wilaya.homePrice : wilaya.officePrice;

    return productsPrice + shippingPrice;
  };

  return (
    <div className="dark:bg-stone-950 rounded-lg w-full py-4 px-5">
      <section className="flex items-center text-neutral-500 justify-between">
        <div className="flex items-center gap-2">
          <p>#{code}</p>
          <p>-</p>
          <div
            className={clsx("font-semibold flex items-center gap-1", {
              "text-red-500": user.blacklist !== null,
              "text-neutral-50": user.blacklist === null,
            })}
          >
            <span>{user.phone}</span>
            {user.blacklist !== null && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <IoWarning className="w-5 h-5" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    className="text-sm bg-neutral-950 border-neutral-900 border rounded-md p-2 font-normal text-neutral-200"
                    align="center"
                    sideOffset={5}
                  >
                    <p>Numéro bloqué</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {/* <p>-</p> */}
          <DashboardOrderStatusBadge
            status={status}
            isLoading={isPatching && patchingCode === code}
          />
        </div>

        <DashboardOrderCardDropdown
          currentStatus={status}
          orderData={{
            code,
            userPhone: user.phone ?? "noPhone",
            isPhoneBlocked: user.blacklist !== null,
          }}
          onUpdateStatus={updateStatus}
          isLoading={isPatching}
        />
      </section>
      <section className="flex items-center gap-4 text-neutral-400 h-12 text-sm">
        <p className="flex gap-1">
          <MdLocationPin className="w-5 h-5" /> {wilaya.name}
        </p>
        <p className="flex gap-1 capitalize">
          <MdOutlineLocationOn className="w-5 h-5" /> {town.name}
        </p>
        <p className="flex gap-1 first-letter:capitalize">
          <MdOutlineMapsHomeWork className="w-5 h-5 " />{" "}
          {isHome
            ? address
            : `Bureau de livraison de la wilaya ${addPartitive(wilaya.name)}`}
        </p>
        <p className="flex gap-1">
          <MdOutlineDateRange className="w-5 h-5 " /> {formatDate(createdAt)}
        </p>
      </section>
      <hr className="dark:border-stone-800" />
      <section className="flex justify-between pt-4">
        <div className="flex flex-col gap-2">
          {orderProducts.map(({ product }, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-stone-900  w-96 rounded-md h-10 px-4 gap-4"
            >
              <p
                className="text-neutral-200 w-56 whitespace-nowrap overflow-ellipsis overflow-hidden"
                title={product.name}
              >
                {product.name}
              </p>

              <p className="text-neutral-400 flex gap-1 items-center">
                {product.discount > 0 && (
                  <span title="Réduction" className="text-xs text-stone-500">
                    -{product.discount}%
                  </span>
                )}
                <span>
                  {discountedPrice(product.price, product.discount)}DA
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-end">
          <div className="text-neutral-200 flex flex-col">
            <div className="flex gap-10">
              <span>Prix livraion:</span>{" "}
              <span>{isHome ? wilaya.homePrice : wilaya.officePrice}DA</span>
            </div>
            <div className="flex gap-10 font-semibold">
              <span>Prix total:</span>{" "}
              <span className="text-secondary">{totalPrice()}DA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
