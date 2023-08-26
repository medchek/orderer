"use client";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";
import DashboardUpdateShippingPrices, {
  WilayaSelection,
  SelectedWilaya,
} from "@/components/dashboard/shipping-prices/DashboardUpdateShippingPrices";
import { useWilayasQuery } from "@/lib/queryHooks";
import { clsx } from "clsx";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

type Props = {};

export default function ShippingPrices({}: Props) {
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

  const {
    isFetching,
    isSuccess,
    isError,
    refetch,
    data: wilayaData,
  } = useWilayasQuery({
    onSuccess: () => {
      initSelectedWilayaList();
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

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchTerm(searchTerm);
  };

  const wilayaList = () => {
    const isWilayaCode = /^[1-9][0-9]?$/gi.test(searchTerm);
    const filteredData = !searchTerm.length
      ? wilayaData
      : wilayaData?.filter(({ name, code }) => {
          if (isWilayaCode) {
            return code === parseInt(searchTerm);
          } else {
            return name.toLocaleLowerCase().includes(searchTerm);
          }
        });
    if (!filteredData?.length) {
      return (
        <div className="absolute flex h-14 w-full  items-center justify-center">
          <div className="absolute w-full text-center align-middle text-stone-400">
            <p>Aucune wilaya ne corresponds à votre recherche</p>
          </div>
        </div>
      );
    } else
      return filteredData.map(
        (
          {
            name,
            code,
            availableHome,
            availableOffice,
            homePrice,
            officePrice,
          },
          idx
        ) => (
          <div
            className={clsx(
              "w-auto rounded-lg bg-stone-950 px-4 py-3 flex flex-col text-stone-100 gap-2 max-h-[13.5rem]",
              { "ring-2": selectedWilayasList[idx]?.selected }
            )}
            key={code}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="h-5 w-5"
                id={`wilaya-${code}-checkbox`}
                checked={!!selectedWilayasList[idx]?.selected}
                onChange={() => handleSelectWilaya(idx)}
              />
              <label htmlFor={`wilaya-${code}-checkbox`} className="w-full">
                {code} - {name}
              </label>
            </div>
            <hr className="border-stone-900" />
            <section className="text-sm">
              <p className="text-stone-600 mb-1">Livraison à domicile</p>
              <div className="flex items-center justify-between">
                <p>{homePrice}DA</p>
                <div
                  className={clsx(
                    "px-2 rounded-md h-7 flex items-center justify-center",
                    availableHome
                      ? "bg-zinc-900 text-blue-400"
                      : "bg-red-950/25 text-red-400"
                  )}
                >
                  {availableHome ? "Disponible" : "Non disponible"}
                </div>
              </div>
            </section>
            <section className="text-sm">
              <p className="text-stone-600 mb-1">Livraison au bureau</p>
              <div className="flex items-center justify-between">
                <p>{officePrice}DA</p>
                <div
                  className={clsx(
                    "px-2 rounded-md h-7 flex items-center justify-center",
                    availableOffice
                      ? "bg-zinc-900 text-blue-400"
                      : "bg-red-950/25 text-red-400"
                  )}
                >
                  {availableOffice ? "Disponible" : "Non disponible"}
                </div>
              </div>
            </section>
            <button
              type="button"
              className="gap-1 dark:bg-stone-900 h-8 rounded-md dark:hover:bg-stone-800 dark:focus:bg-stone-900/50 text-sm"
              onClick={() => openModal(idx)}
            >
              <MdEdit className="h-5 w-5" />
              Modifier
            </button>
          </div>
        )
      );
  };

  const loadingSkeleton = Array.from({ length: 18 }, (_, i) => (
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
  ));

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

      <section className="relative h-full w-full overflow-x-hidden pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-2">
        {isFetching && loadingSkeleton}
        {isSuccess && wilayaList()}
        {isError && !isFetching && (
          <DashboardFetchError
            refetch={refetch}
            text="Une érreur est survenu lors de la recherche des wilayas"
          />
        )}
      </section>
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
