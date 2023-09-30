"use client";
import { ChangeEvent, useState } from "react";
import { StatusFilter } from "./DashboardOrdersToolbar";

import { useStore } from "@/store";
import { Status } from "@prisma/client";
import { ORDER_CODE_LENGTH } from "@/lib/constants";
import { useGetWilayas } from "../../shipping-prices/api/getWilayas";
import FilterPopover from "@/components/filter/FilterPopover";
import { useGetOrders } from "../api/getOrders";
import FilterInput from "@/components/filter/FilterInput";
import FilterLabel from "@/components/filter/FilterLabel";
import FilterSelect from "@/components/filter/FilterSelect";

export default function DashboardOrdersFilter() {
  const { data: wilayasData, isFetching: isFetchingWilayas } = useGetWilayas();

  const { ordersQueryFilters, setOrdersQueryFilters } = useStore();

  const hasFilters = !!Object.entries(ordersQueryFilters).filter(
    ([_, v]) => !!v,
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
    ordersQueryFilters.status ?? "",
  );
  const [WilayaFilter, setWilayaFilter] = useState<string>(
    ordersQueryFilters.wilaya ?? "",
  );
  const [shippingTypeFilter, setShippingTypeFilter] = useState<string>(
    ordersQueryFilters.shippingType ?? "",
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
    setOrdersQueryFilters({ currentPage: 0 });
    setPhoneFilter("");
    setCodeFilter("");
    setShippingTypeFilter("");
    setWilayaFilter("");
    setStatusFilter("");
  };

  const { data: ordersData } = useGetOrders({
    filters: ordersQueryFilters,
  });

  return (
    <FilterPopover
      hasFilters={hasFilters}
      onApplyFiltersClick={handleApplyFiltersClick}
      onResetFiltersClick={handleResetFiltersClick}
      disabled={!ordersData || (ordersData.data.length === 0 && !hasFilters)}
    >
      <section className="flex flex-col gap-2">
        <FilterLabel label="Status" htmlFor="status-filter-select">
          <FilterSelect
            id="status-filter-select"
            onChange={handleStatusSelect}
            defaultValue={ordersQueryFilters.status}
          >
            {statusFilters.map(({ text, value }) => (
              <option value={value} key={value}>
                {text}
              </option>
            ))}
          </FilterSelect>
        </FilterLabel>
        {/*  */}
        <FilterLabel label="Wilaya" htmlFor="wilaya-filter-select">
          <FilterSelect
            id="wilaya-filter-select"
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
          </FilterSelect>
        </FilterLabel>
        {/* shipping type */}
        <FilterLabel label="Livraison" htmlFor="shipping-type-filter-select">
          <FilterSelect
            id="shipping-type-filter-select"
            onChange={handleShippingTypeSelect}
            defaultValue={ordersQueryFilters.shippingType}
          >
            <option value="">Non précisée</option>
            <option value="home">À domicile</option>
            <option value="office">Au bureau de livraison</option>
          </FilterSelect>
        </FilterLabel>
        {/* PHONE */}
        <FilterLabel label="Téléphone" htmlFor="phone-filter-input">
          <FilterInput
            id="phone-filter-input"
            placeholder="Chercher par téléhpone"
            onChange={(e) => setPhoneFilter(e.target.value.trim())}
            value={phoneFilter}
            maxLength={10}
            minLength={2}
            autoComplete="off"
          />
        </FilterLabel>
        {/* CODE */}
        <FilterLabel label="Code" htmlFor="code-filter-input">
          <FilterInput
            id="code-filter-input"
            placeholder="Chercher par code"
            value={codeFilter}
            onChange={(e) => setCodeFilter(e.target.value.trim())}
            maxLength={ORDER_CODE_LENGTH}
            autoComplete="off"
          />
        </FilterLabel>
      </section>
    </FilterPopover>
  );
}
