"use client";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";
import DashboardUpdateShippingPrices, {
  WilayaSelection,
  SelectedWilaya,
} from "@/features/shipping-prices/components/DashboardUpdateShippingPrices";
import { useGetWilayas } from "@/features/shipping-prices/api/getWilayas";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import { LiaShippingFastSolid } from "react-icons/lia";
import DashboardWilayaCard from "@/features/shipping-prices/components/DashboardWilayaCard";

export default function ShippingPrices() {
  // filtered wilayas list

  /**
   * State of all wilayas selection data created upon component mounting
   */
  const [selectedWilayasList, setSelectedWilayasList] =
    useState<WilayaSelection>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * state to modify a single wilaya at a time
   */
  const [selectedSingleWilaya, setSelectedSingleWilaya] =
    useState<SelectedWilaya | null>(null);

  /**
   * State to modify multiple wilayas at once
   */
  const [multipleSelected, setMultipleSelected] = useState<WilayaSelection>([]);
  useEffect(() => {
    if (selectedWilayasList.length) {
      setMultipleSelected(
        selectedWilayasList.filter((w) => w.selected === true)
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

  const initSelectedWilayaList = () => {
    if (wilayaData?.length) {
      setSelectedWilayasList(
        wilayaData.map((w, index) => ({
          ...w,
          selected: false,
          index,
        }))
      );
    }
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

  useEffect(() => {
    // if the wilayas are already present, just populate the selected state
    if (wilayaData?.length) {
      initSelectedWilayaList();
    }
  }, [wilayaData]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWilayasList(
      selectedWilayasList.map((w, index) => ({
        ...w,
        selected: e.target.checked,
        index,
      }))
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
          className="absolute top-0 left-0"
          Icon={<LiaShippingFastSolid className="w-12 h-12" />}
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
        className="mr-6 flex h-16 min-h-[4rem] items-center justify-between pl-2 "
      >
        <div className="flex gap-2">
          <label
            htmlFor="wilaya-select-all-checkbox"
            className="w-10 h-10 dark:bg-stone-950 dark:hover:bg-stone-900 rounded-md flex items-center justify-center"
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
          <button
            type="button"
            className="flex h-10 items-center justify-center gap-1 rounded-md bg-primary px-4 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-stone-800 disabled:text-stone-400 dark:bg-blue-600 dark:hover:bg-secondary dark:focus:bg-blue-700 dark:disabled:bg-stone-900 dark:disabled:text-stone-600"
            onClick={() => {
              // reset the selected wilaya to tell the update component that multiple wilayas should be modified
              setSelectedSingleWilaya(null);
              setIsModalOpen(true);
            }}
            disabled={multipleSelected.length <= 0}
          >
            <MdEdit className="h-6 w-6" /> Modifier la sélection
          </button>
        </div>

        <DashboardSearchInput
          placeholder="Chercher une wilaya"
          onChange={handleSearchInputChange}
        />
      </section>
      {/* ----------------------------------------------------------- */}

      {/* new Body  */}
      <div className="w-full h-full grow overflow-x-hidden">
        <section className="relative w-full pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-2">
          {isFetching &&
            Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                className="w-full animate-pulse bg-stone-950 h-48 p-4 [&>div]:bg-stone-800 flex flex-col justify-between"
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
