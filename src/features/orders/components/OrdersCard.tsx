import {
  MdLocationPin,
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
import DashboardOrderStatusBadge from "./DashboardOrdersStatusBadge";
import { PublicOrderData } from "../types";
import { TbExternalLink } from "react-icons/tb";
import Link from "next/link";

// GetAllOrdersSuccessResponsePayload represents a single order data schema
interface Props extends PublicOrderData {}

export default function OrdersCard({
  code,
  phone,
  address,
  createdAt,
  isHome,
  location,
  orderProducts,
  status,
  wilaya,
  town,
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
    <div className="w-full rounded-lg bg-neutral-200 px-5 py-4 dark:bg-neutral-950">
      <section className="flex items-center justify-between text-neutral-500">
        <div className="flex items-center gap-2">
          <Link
            href={{
              pathname: `/orders/${code}`,
            }}
            className="hover:underline"
            target="_blank"
          >
            #{code}
          </Link>
          <p>-</p>
          <div className="flex items-center gap-1 font-semibold text-neutral-950 dark:text-neutral-50">
            <span>{phone.phone}</span>
          </div>
          {/* <p>-</p> */}
          <DashboardOrderStatusBadge status={status} />
        </div>
        <Link href={`./orders/${code}`} title="Détails" target="_blank">
          <TbExternalLink className="h-6 w-6 text-neutral-500" />
        </Link>
      </section>
      <section className="flex h-12 items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <p className="flex gap-1">
          <MdLocationPin className="h-5 w-5" /> {wilaya.name}
        </p>
        <p className="flex gap-1 capitalize">
          <MdOutlineLocationOn className="h-5 w-5" /> {town.name}
        </p>
        <p className="flex gap-1 first-letter:capitalize">
          <MdOutlineMapsHomeWork className="h-5 w-5" />{" "}
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
          <MdOutlineDateRange className="h-5 w-5" /> {formatDate(createdAt)}
        </p>
      </section>
      <hr className="dark:border-neutral-800" />
      <section className="flex justify-between pt-4">
        <div className="flex flex-col gap-2">
          {orderProducts.map(({ product }, i) => (
            <div
              key={i}
              className="flex h-10 w-96 items-center justify-between gap-4 rounded-md bg-neutral-300 px-4 dark:bg-neutral-800"
            >
              <p
                className="w-56 overflow-hidden overflow-ellipsis whitespace-nowrap text-neutral-800 dark:text-neutral-200"
                title={product.name}
              >
                {product.name}
              </p>

              <p className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
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
          <div className="flex flex-col text-neutral-800 dark:text-neutral-200">
            <div className="flex justify-between gap-10">
              <span>Prix livraion:</span>
              <span>{shippingPrice + (location?.additionalCosts ?? 0)}DA</span>
            </div>
            <div className="flex justify-between gap-10 font-semibold">
              <span>Prix total:</span>
              <span className="text-secondary">{totalPrice()}DA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
