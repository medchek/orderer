import {
  MdLocationPin,
  MdOutlineCheck,
  MdOutlineDateRange,
  MdOutlineLocationOn,
  MdOutlineMapsHomeWork,
} from "react-icons/md";
import {
  addPartitive,
  calculateTotalPrice,
  discountedPrice,
  formatDate,
} from "@/lib/utils";
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
  location,
  status,
  wilaya,
  town,
  updateStatus,
  isPatching,
  patchingCode,
}: Props) {
  const shippingPrice = isHome ? wilaya.homePrice : wilaya.officePrice;
  const totalPrice = () => {
    const productsPrice = orderProducts.reduce((prev, { product }) => {
      return prev + discountedPrice(product.price, product.discount);
    }, 0);

    return calculateTotalPrice({
      productsPrice,
      shippingPrice,
      additionalCosts: location?.additionalCosts ?? 0,
    });
  };

  return (
    <div className="w-full rounded-lg px-5 py-4  dark:bg-neutral-950">
      <section className="flex items-center justify-between text-neutral-500">
        <div className="flex items-center gap-2">
          <p>#{code}</p>
          <p>-</p>
          <div
            className={clsx("flex items-center gap-1 font-semibold", {
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
                      <IoWarning className="h-5 w-5" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    className="rounded-md border border-neutral-900 bg-neutral-950 p-2 text-sm font-normal text-neutral-200"
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
          {status === Status.SUCCESS && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600">
              <MdOutlineCheck className="h-3.5 w-3.5 text-white" />
            </span>
          )}
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
      <section className="flex h-12 items-center gap-4 text-sm text-neutral-400">
        <p className="flex gap-1">
          <MdLocationPin className="h-5 w-5" /> {wilaya.name}
        </p>
        <p className="flex gap-1 capitalize">
          <MdOutlineLocationOn className="h-5 w-5" /> {town.name}
        </p>
        <p className="flex gap-1 first-letter:capitalize">
          <MdOutlineMapsHomeWork className="h-5 w-5 " />{" "}
          {isHome
            ? // display the home address for home shipping
              address
            : // if it's an office (stopdesk) shipping type and a location was chosen...
            location !== null
            ? // display it
              location.name
            : // otherwise display a generic stopdesk shipping message
              `Bureau de livraison de la wilaya ${addPartitive(wilaya.name)}`}
        </p>
        <p className="flex gap-1">
          <MdOutlineDateRange className="h-5 w-5 " /> {formatDate(createdAt)}
        </p>
      </section>
      <hr className="dark:border-neutral-800" />
      <section className="flex justify-between pt-4">
        <div className="flex flex-col gap-2">
          {orderProducts.map(({ product }, i) => (
            <div
              key={i}
              className="flex h-10 w-96 items-center  justify-between gap-4 rounded-md bg-neutral-800 px-4"
            >
              <p
                className="w-56 overflow-hidden overflow-ellipsis whitespace-nowrap text-neutral-200"
                title={product.name}
              >
                {product.name}
              </p>

              <p className="flex items-center gap-1 text-neutral-400">
                {product.discount > 0 && (
                  <span title="Réduction" className="text-xs text-neutral-500">
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
          <div className="flex flex-col text-neutral-200">
            <div className="flex justify-between gap-10">
              <span>Prix livraion:</span>{" "}
              <span>{shippingPrice + (location?.additionalCosts ?? 0)}DA</span>
            </div>
            <div className="flex justify-between gap-10 font-semibold">
              <span>Prix total:</span>{" "}
              <span className="text-secondary">{totalPrice()}DA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
