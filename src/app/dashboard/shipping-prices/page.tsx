"use client";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";
import DashboardUpdateShippingPrices, {
  SelectedWilaya,
} from "@/features/shipping-prices/components/DashboardUpdateShippingPrices";
import { useGetWilayas } from "@/features/shipping-prices/api/getWilayas";
import React, { useCallback, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import { LiaShippingFastSolid } from "react-icons/lia";
import DashboardWilayaCard from "@/features/shipping-prices/components/DashboardWilayaCard";
import { WilayasSelection } from "@/features/shipping-prices/types";
import Button from "@/components/Button";

export default function ShippingPrices() {
  // filtered wilayas list

  /**
   * State of all wilayas selection data created upon component mounting
   */
  const [selectedWilayasList, setSelectedWilayasList] =
    useState<WilayasSelection>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * state to modify a single wilaya at a time
   */
  const [selectedSingleWilaya, setSelectedSingleWilaya] =
    useState<SelectedWilaya | null>(null);

  /**
   * State to modify multiple wilayas at once
   */
  const [multipleSelected, setMultipleSelected] = useState<WilayasSelection>(
    [],
  );
  useEffect(() => {
    if (selectedWilayasList.length) {
      setMultipleSelected(
        selectedWilayasList.filter((w) => w.selected === true),
      );
    }
  }, [selectedWilayasList]);

  const closeModal = () => {
    setSelectedSingleWilaya(null);
    setIsModalOpen(false);
  };

  /**
   * Open the modal and sets the selected wilaya data
   * @param index the selected wilaya index
   */
  const openModal = (index: number) => {
    if (!wilayaData) return;
    setSelectedSingleWilaya({ ...wilayaData[index], index });
    setIsModalOpen(true);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchTerm(searchTerm);
  };

  const {
    isFetching,
    isSuccess,
    isError,
    refetch,
    data: wilayaData,
  } = useGetWilayas({
    select: (data) => {
      const isWilayaCode = /^[1-9][0-9]?$/gi.test(searchTerm);
      return !searchTerm.length
        ? data
        : data?.filter(({ name, code }) => {
            if (isWilayaCode) {
              return code === parseInt(searchTerm);
            } else {
              return name.toLocaleLowerCase().includes(searchTerm);
            }
          });
    },
  });

  const initSelectedWilayaList = useCallback(() => {
    if (wilayaData && wilayaData.length > 0) {
      setSelectedWilayasList(
        wilayaData.map((w, index) => ({
          ...w,
          selected: false,
          index,
        })),
      );
    }
  }, [wilayaData]);

  useEffect(() => {
    // if the wilayas are already present, just populate the selected state
    if (wilayaData && wilayaData.length > 0) {
      initSelectedWilayaList();
    }
  }, [wilayaData, initSelectedWilayaList]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWilayasList(
      selectedWilayasList.map((w, index) => ({
        ...w,
        selected: e.target.checked,
        index,
      })),
    );
  };

  const handleSelectWilaya = (i: number) => {
    const selectedWilayaCopy = [...selectedWilayasList];
    selectedWilayaCopy[i].selected = !selectedWilayaCopy[i].selected;
    setSelectedWilayasList(selectedWilayaCopy);
  };

  const wilayaList = () => {
    if (!wilayaData?.length) {
      return (
        <DashboardEmptyState
          text="Aucune wilaya ne corresponds à votre recherche"
          className="absolute left-0 top-0"
          Icon={<LiaShippingFastSolid className="h-12 w-12" />}
        />
      );
    } else
      return wilayaData?.map((wilaya, idx) => (
        <DashboardWilayaCard
          key={wilaya.code}
          wilaya={wilaya}
          handleEditClick={() => openModal(idx)}
          handleSelectClick={() => handleSelectWilaya(idx)}
          isSelected={selectedWilayasList[idx]?.selected}
        />
      ));
  };

  return (
    <div
      id="shipping-prices"
      className="flex w-full grow flex-col overflow-y-hidden py-3 pl-4 dark:[color-scheme:dark]"
    >
      <DashboardHeader label="Prix de livraisons" className="pl-2" />
      {/* ----------------------------------------------------------- */}
      <section
        id="shipping-prices-toolbar"
        className="mr-6 flex h-16 min-h-[4rem] items-center justify-between pl-2"
      >
        <div className="flex gap-2">
          <label
            htmlFor="wilaya-select-all-checkbox"
            className="flex h-10 w-10 items-center justify-center rounded-md dark:bg-neutral-950 dark:hover:bg-neutral-900"
            title="Tout sélectionner"
          >
            <input
              type="checkbox"
              className="h-5 w-5"
              id="wilaya-select-all-checkbox"
              // checked={!!selectedWilayasList[idx]?.selected}
              onChange={handleSelectAll}
            />
          </label>
          <Button
            type="button"
            className="flex h-10 w-auto items-center justify-center gap-1 px-4 font-semibold outline-hidden"
            onClick={() => {
              // reset the selected wilaya to tell the update component that multiple wilayas should be modified
              setSelectedSingleWilaya(null);
              setIsModalOpen(true);
            }}
            disabled={multipleSelected.length <= 0}
          >
            <MdEdit className="size-6" /> Modifier la sélection
          </Button>
        </div>

        <DashboardSearchInput
          placeholder="Chercher une wilaya"
          onChange={handleSearchInputChange}
        />
      </section>
      {/* ----------------------------------------------------------- */}

      {/* new Body  */}
      <div className="h-full w-full grow overflow-x-hidden">
        <section className="relative grid w-full grid-cols-1 gap-2 p-2 pr-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {isFetching &&
            Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                className="flex h-48 w-full animate-pulse flex-col justify-between bg-neutral-300 p-4 dark:bg-neutral-950 [&>div]:bg-neutral-400 dark:[&>div]:bg-neutral-800"
              >
                <div className="h-5 rounded-md"></div>
                <div className="h-4 w-1/2 rounded-md"></div>
                <div className="h-5 rounded-md"></div>
                <div className="h-4 w-1/2 rounded-md"></div>

                <div className="h-6 rounded-md"></div>
              </div>
            ))}
          {isSuccess && wilayaList()}
          {isError && !isFetching && (
            <DashboardFetchError
              refetch={refetch}
              text="Une érreur est survenu lors de la recherche des wilayas"
            />
          )}
        </section>
      </div>
      {isModalOpen && (
        <DashboardUpdateShippingPrices
          selectedWilaya={selectedSingleWilaya}
          selectedMultiple={multipleSelected}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
