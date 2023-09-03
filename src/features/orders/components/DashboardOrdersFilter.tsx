"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { ChangeEvent, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { StatusFilter } from "./DashboardOrdersToolbar";
import DashboardOrdersFilterSelect from "./DashboardOrdersFilterSelect";

import clsx from "clsx";

import { useStore } from "@/store";
import { Status } from "@prisma/client";
import DashboardOrdersFilterInput from "./DashboardOrdersFilterInput";
import { ORDER_CODE_LENGTH } from "@/lib/constants";
import { useGetWilayas } from "../../shipping-prices/api/getWilayas";



export default function DashboardOrdersFilter() {
  const { data: wilayasData, isFetching: isFetchingWilayas } =
    useGetWilayas();

  const { ordersQueryFilters, setOrdersQueryFilters } = useStore();

  const hasFilters = !!Object.entries(ordersQueryFilters).filter(
    ([_, v]) => !!v
  ).length;

  const statusFilters: StatusFilter[] = [
    {
      value: "",
      text: "Tout",
    },
    {
      value: "UNCONFIRMED",
      text: "Non confirmée",
    },
    {
      value: "CONFIRMED",
      text: "Confirmée",
    },
    {
      value: "SHIPPING",
      text: "En livraison",
    },
    {
      value: "SUCCESS",
      text: "Complétée",
    },
    {
      value: "RETURNED",
      text: "Retournée",
    },
    {
      value: "CANCELED",
      text: "Annulée",
    },
  ];
  const [statusFilter, setStatusFilter] = useState<Status | "">(
    ordersQueryFilters.status ?? ""
  );
  const [WilayaFilter, setWilayaFilter] = useState<string>(
    ordersQueryFilters.wilaya ?? ""
  );
  const [shippingTypeFilter, setShippingTypeFilter] = useState<string>(
    ordersQueryFilters.shippingType ?? ""
  );

  const [phoneFilter, setPhoneFilter] = useState("");
  const [codeFilter, setCodeFilter] = useState("");

  // const [date, setDate] = useState<Date>();

  const handleStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as Status | "");
  };
  const handleWilayaSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setWilayaFilter(e.target.value);
  };
  const handleShippingTypeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setShippingTypeFilter(e.target.value);
  };

  const handleApplyFiltersClick = () => {
    setOrdersQueryFilters({
      ...ordersQueryFilters,
      status: statusFilter,
      wilaya: WilayaFilter,
      shippingType: shippingTypeFilter,
      phone: phoneFilter,
      code: codeFilter,
    });
  };

  const handleResetFiltersClick = () => {
    setOrdersQueryFilters({currentPage: 0});
    setPhoneFilter("");
    setCodeFilter("");
    setShippingTypeFilter("");
    setWilayaFilter("");
    setStatusFilter("");
  };

  return (
    <Popover modal={false}>
      <PopoverTrigger
        title="Filtrer par"
        className={clsx(
          "flex items-center justify-center gap-1 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-950  transition-colors h-10 px-6 rounded-lg outline-none shadow-md  ",
          { "text-secondary": hasFilters, "text-stone-400": !hasFilters }
        )}
      >
        <BiFilterAlt className="h-6 w-6" /> Filtrer
      </PopoverTrigger>

      <PopoverContent
        avoidCollisions
        sideOffset={10}
        align="end"
        className="flex flex-col gap-1 px-4 z-10 py-2 bg-neutral-900 border border-neutral-800 rounded-lg outline-none text-sm text-neutral-500 w-80"
      >
        <div className="flex items-center justify-between h-8">
          <p className="text-stone-300 text-base">Filtrer</p>
          {hasFilters && <p className="text-stone-600">Filtres appliqués</p>}
        </div>

        <section className="flex flex-col gap-2">
          <DashboardOrdersFilterSelect
            label="Status"
            onChange={handleStatusSelect}
            defaultValue={ordersQueryFilters.status}
          >
            {statusFilters.map(({ text, value }) => (
              <option value={value} key={value}>
                {text}
              </option>
            ))}
          </DashboardOrdersFilterSelect>
          {/*  */}
          <DashboardOrdersFilterSelect
            label="Wilaya"
            isLoading={isFetchingWilayas}
            onChange={handleWilayaSelect}
            defaultValue={ordersQueryFilters.wilaya}
          >
            <option value="">Toutes</option>
            {wilayasData?.map(({ code, name }) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </DashboardOrdersFilterSelect>
          {/* shipping type */}
          <DashboardOrdersFilterSelect
            label="Livraison"
            onChange={handleShippingTypeSelect}
            defaultValue={ordersQueryFilters.shippingType}
          >
            <option value="">Non précisée</option>
            <option value="home">À domicile</option>
            <option value="office">Au bureau de livraison</option>
          </DashboardOrdersFilterSelect>
          {/* PHONE */}
          <DashboardOrdersFilterInput
            label="Téléphone"
            placeholder="Chercher par téléhpone"
            onChange={(e) => setPhoneFilter(e.target.value.trim())}
            value={phoneFilter}
            maxLength={10}
            minLength={2}
            autoComplete="off"
          />
          {/* CODE */}
          <DashboardOrdersFilterInput
            label="Code"
            placeholder="Chercher par code"
            value={codeFilter}
            onChange={(e) => setCodeFilter(e.target.value.trim())}
            maxLength={ORDER_CODE_LENGTH}
            autoComplete="off"
          />
          {/* <DashboardOrdersFilterSelect label="Produit">
            <option>Tout</option>
          </DashboardOrdersFilterSelect> */}
          {/* DATE */}
          {/* <div className="flex justify-between items-center">
            <p id="date-select">Date</p>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={clsx(
                    "h-8 w-44 justify-start text-left font-normal bg-neutral-800 text-neutral-300 px-1 rounded-md",
                    !date && "text-muted-foreground"
                  )}
                >
                  <MdOutlineCalendarMonth className="mr-1 h-5 w-5" />
                  {date ? formatDate(date, true) : <span>Non spécifiée</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 outline-none border border-neutral-800 bg-neutral-900">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="  outline-none border-none"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div> */}
        </section>
        <section className="flex items-center justify-end gap-2 h-10">
          <button
            type="button"
            className=" px-2 rounded-md mt-1 h-8 text-neutral-400 hover:text-neutral-200 active:bg-neutral-800 transition-colors"
            onClick={handleResetFiltersClick}
          >
            Réinitialiser
          </button>
          <button
            type="button"
            onClick={handleApplyFiltersClick}
            className=" w-20 rounded-md mt-1 h-8 bg-blue-600 focus:bg-blue-700 text-neutral-100 hover:bg-blue-500 transition-colors"
          >
            Appliquer
          </button>
        </section>
      </PopoverContent>
    </Popover>
  );
}
