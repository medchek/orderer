import FilterInput from "@/components/filter/FilterInput";
import FilterLabel from "@/components/filter/FilterLabel";
import FilterPopover from "@/components/filter/FilterPopover";
import { useState, useEffect } from "react";
import ShippingLocationWilayaSelect from "./ShippingLocationWilayaSelect";
import ShippingLocationTownSelect from "./ShippingLocationTownSelect";
import { useStore } from "@/store";
import {
  ShippingLocationsQueryFilter,
  useGetLocations,
} from "../api/getLocations";
import FilterSelect from "@/components/filter/FilterSelect";

export default function DashboardShippingLocationFilter() {
  const { shippingLocationsQueryFilters, setShippingLocationsQueryFilters } =
    useStore();
  const [name, setName] = useState("");
  const [wilaya, setWilaya] = useState<number | null>(null);
  const [town, setTown] = useState<number | null>(null);
  const [hasCoordinates, setHasCoordinates] =
    useState<ShippingLocationsQueryFilter["hasCoordinates"]>("");

  // set the defaultValues on component render
  useEffect(() => {
    const { name, town, wilaya, hasCoordinates } =
      shippingLocationsQueryFilters;
    if (name) setName(name);
    if (wilaya) setWilaya(wilaya);
    if (town) setTown(town);
    if (hasCoordinates) setHasCoordinates(hasCoordinates);
  }, [shippingLocationsQueryFilters]);

  const [hasFilters, setHasFilters] = useState(false);
  useEffect(() => {
    // current page is always present, hence verifying length > 1
    setHasFilters(Object.keys(shippingLocationsQueryFilters).length > 1);
  }, [shippingLocationsQueryFilters]);

  const handleApplyFilters = () => {
    const filters: ShippingLocationsQueryFilter = {
      currentPage: shippingLocationsQueryFilters.currentPage,
    };

    if (name) filters.name = name;
    if (wilaya) filters.wilaya = wilaya;
    if (town) filters.town = town;
    if (hasCoordinates) filters.hasCoordinates = hasCoordinates;

    setShippingLocationsQueryFilters(filters);
  };

  const handleResetFilter = () => {
    setName("");
    setWilaya(null);
    setTown(null);
    setShippingLocationsQueryFilters({ currentPage: 0 });
  };

  const { data: locationsData } = useGetLocations(
    shippingLocationsQueryFilters,
  );

  return (
    <FilterPopover
      onApplyFiltersClick={handleApplyFilters}
      onResetFiltersClick={handleResetFilter}
      hasFilters={hasFilters}
      disabled={
        !locationsData || (locationsData.data.length === 0 && !hasFilters)
      }
    >
      <div className="flex flex-col gap-2">
        <FilterLabel label="Nom" htmlFor="name-input">
          <FilterInput
            autoComplete="off"
            placeholder="Nom"
            id="name-input"
            onChange={(e) => setName(e.target.value.trim())}
            value={name}
          />
        </FilterLabel>
        <FilterLabel label="Wilaya" htmlFor="wilaya-select">
          <ShippingLocationWilayaSelect
            id="wilaya-select"
            onChange={(v) => setWilaya(v)}
            value={wilaya}
          />
        </FilterLabel>
        <FilterLabel label="Commune" htmlFor="town-select">
          <ShippingLocationTownSelect
            id="town-select"
            wilayaCode={wilaya}
            onChange={(v) => setTown(v)}
            value={town}
          />
        </FilterLabel>
        <FilterLabel label="Coordonnés" htmlFor="coord-select">
          <FilterSelect
            value={hasCoordinates}
            id="coord-select"
            onChange={(e) =>
              setHasCoordinates(
                e.target.value.trim() as ShippingLocationsQueryFilter["hasCoordinates"],
              )
            }
          >
            <option value="">Non spécifié</option>
            <option value="1">Avec</option>
            <option value="0">Sans</option>
          </FilterSelect>
        </FilterLabel>
      </div>
    </FilterPopover>
  );
}
