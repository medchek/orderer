"use client";
import Modal from "@/components/Modal";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardUpdateShippingPrices, {
  MultipleWilayaSelection,
  SelectedWilaya,
} from "@/components/dashboard/DashboardUpdateShippingPrices";
import { useStore } from "@/store";
import { WilayaWithAvailability } from "@/store/wilayaSlice";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { MdEdit, MdSearch } from "react-icons/md";
import { useDebounce } from "usehooks-ts";

type Props = {};

export default function ShippingPrices({}: Props) {
  const {
    wilayas: storeWilayas,
    wilayaFetchStatus,
    fetchPublicWilayas: fetchWilayas,
    getFilteredWilayas,
  } = useStore();
  const [wilayas, setWilayas] = useState<WilayaWithAvailability[]>([]);

  const [selectedWilayasList, setSelectedWilayasList] =
    useState<MultipleWilayaSelection>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedWilaya, setSelectedWilaya] = useState<SelectedWilaya | null>(
    null
  );

  const [multipleSelected, setMultipleSelected] =
    useState<MultipleWilayaSelection>([]);

  useEffect(() => {
    if (selectedWilayasList.length) {
      setMultipleSelected(
        selectedWilayasList.filter((w) => w.selected === true)
      );
    }
  }, [selectedWilayasList]);

  const closeModal = () => {
    setSelectedWilaya(null);
    setIsModalOpen(false);
  };

  /**
   * Open the modal and sets the selected wilaya data
   * @param index the selected wilaya index
   */
  const openModal = (index: number) => {
    setSelectedWilaya({ ...wilayas[index], index } as SelectedWilaya);
    setIsModalOpen(true);
  };

  /**
   * Creates the logic to be able to select wilayas
   */
  useEffect(() => {
    if (wilayaFetchStatus !== "success") {
      fetchWilayas().then(({ status, wilayas }) => {
        if (status === "success") {
          setWilayas(wilayas as WilayaWithAvailability[]);
          setSelectedWilayasList(
            wilayas.map(({ code, available }, index) => ({
              code,
              selected: false,
              available: !!available,
              index,
            }))
          );
        }
      });
    } else {
      // if the wilayas are already present, just populate the selected state
      setSelectedWilayasList(
        storeWilayas.map(({ code, available }, index) => ({
          code,
          selected: false,
          available: !!available,
          index,
        }))
      );
    }
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWilayasList(
      selectedWilayasList.map(({ code, available }, index) => ({
        code,
        selected: e.target.checked,
        available,
        index,
      }))
    );
  };

  const handleSelectWilaya = (i: number) => {
    const selectedWilayaCopy = [...selectedWilayasList];
    selectedWilayaCopy[i].selected = !selectedWilayaCopy[i].selected;
    setSelectedWilayasList(selectedWilayaCopy);
  };

  const [filterTerm, setFilterTerm] = useState("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    setFilterTerm(searchTerm);
  };

  useEffect(() => {
    if (storeWilayas.length) {
      console.log("changed!");
      const filteredWilayas = getFilteredWilayas(
        filterTerm
      ) as WilayaWithAvailability[];
      setWilayas(filteredWilayas);
    }
  }, [filterTerm, storeWilayas]);

  const wilayaList = () => {
    if (!wilayas.length) {
      return (
        <p className="flex h-12 w-full items-center justify-center text-stone-400">
          Aucune wilaya ne corresponds à votre recherche
        </p>
      );
    } else
      return wilayas.map(
        ({ name, code, available, homePrice, officePrice }, idx) => (
          <div
            key={code}
            className="flex h-12 min-h-[3rem] w-full items-center gap-1 rounded-lg text-sm text-white transition-colors hover:bg-stone-600/10 [&>td]:pr-20 [&>td]:text-left"
          >
            <div className="flex w-14 items-center pl-4 2xl:w-20">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={!!selectedWilayasList[idx]?.selected}
                onChange={() => handleSelectWilaya(idx)}
              />
            </div>
            <p className="w-20 2xl:w-32">{code}</p>
            <p className="w-44 2xl:w-44">{name}</p>
            <p className="w-48 xl:w-64">{homePrice}DA</p>
            <p className="w-48 xl:w-64">{officePrice}DA</p>
            <p
              className={`w-28 2xl:w-36 ${
                available ? "text-secondary" : "text-red-500"
              }`}
            >
              {available ? "Disponible" : "Non disponible"}
            </p>
            <div className="w-auto grow">
              <button
                type="button"
                title="Modifier les prix de livraisons"
                className="h-8 w-8 rounded-lg transition-colors dark:hover:bg-stone-800 dark:focus:bg-stone-900/50"
                onClick={() => openModal(idx)}
              >
                <MdEdit className="h-5 w-5" />
              </button>
            </div>
          </div>
        )
      );
  };

  return (
    <div
      id="shipping-prices"
      className="flex w-full grow flex-col overflow-y-hidden py-3 pl-6"
    >
      <DashboardHeader label="Prix de livraisons" />
      {/* ----------------------------------------------------------- */}
      <section
        id="shipping-prices-toolbar"
        className="mb-3 mr-6 flex items-center justify-between"
      >
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-1 rounded-md bg-primary px-4 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-stone-800 disabled:text-stone-400 dark:bg-blue-600 dark:hover:bg-secondary dark:focus:bg-blue-700 dark:disabled:bg-stone-900 dark:disabled:text-stone-600"
          onClick={() => {
            // reset the selected wilaya to tell the update component that multiple wilayas should be modified
            setSelectedWilaya(null);
            setIsModalOpen(true);
          }}
          disabled={multipleSelected.length < 2}
        >
          <MdEdit className="h-6 w-6" /> Modifier la sélection
        </button>

        <div className="relative flex h-10 w-72 items-center">
          <MdSearch className="absolute left-2 h-7 w-7 text-stone-400" />
          <input
            type="search"
            className="h-full w-full rounded-lg bg-[#ECECEC] px-4  pl-10 pr-4 placeholder-[#979797] outline-none ring-secondary focus:ring-2 dark:bg-[#17181D] dark:text-white dark:[color-scheme:dark]"
            placeholder="Chercher une wilaya"
            onChange={handleSearchInputChange}
          />
        </div>
      </section>
      {/* ----------------------------------------------------------- */}

      <section
        className="flex w-full grow flex-col gap-2 overflow-auto"
        id="wilaya-display"
      >
        <div
          id="table-header"
          className="flex h-14 min-h-[3.5rem] w-full items-center gap-1 text-sm font-semibold text-stone-500 dark:[color-scheme:dark] 2xl:text-base  [&>p]:text-left"
        >
          <div className="flex w-14 items-center pl-4 2xl:w-20">
            <input
              id="select-all-checkbox"
              type="checkbox"
              onChange={handleSelectAll}
              className="h-4 w-4"
              disabled={wilayaFetchStatus !== "success"}
            />
          </div>
          <p className="w-20 2xl:w-32">N° Wilaya</p>
          <p className="w-44 2xl:w-44">Nom</p>
          <p className="w-48 xl:w-64">Prix livraison à domicile</p>
          <p className="w-48 xl:w-64">Prix livraison au bureau</p>
          <p className="w-28 2xl:w-36">Disponibilité</p>
          <p className="w-auto ">Actions</p>
        </div>
        <div
          className={`flex w-full grow flex-col gap-2   dark:[color-scheme:dark] ${
            wilayaFetchStatus === "success"
              ? "overflow-y-auto pr-2"
              : "overflow-hidden pr-6"
          }`}
        >
          {(wilayaFetchStatus === "init" || wilayaFetchStatus === "fetching") &&
            Array.from({ length: 19 }, (_, i) => (
              <div
                key={i}
                className="h-12 min-h-[3rem] w-full animate-pulse rounded-lg bg-[#19191b] duration-75"
              ></div>
            ))}

          {wilayaFetchStatus === "error" && (
            <div className="flex w-full grow flex-col items-center gap-2">
              <p className="mt-2 text-red-500">
                Une érreur est survenu lors de la recherche des wilayas
              </p>
              <button
                type="button"
                className="h-10 w-28 rounded-lg  font-semibold text-red-500 transition-colors hover:bg-red-800 hover:text-red-50 focus:bg-red-950 focus:text-white"
                onClick={fetchWilayas}
              >
                Réessayer
              </button>
            </div>
          )}
          {wilayaFetchStatus === "success" && wilayaList()}
        </div>
      </section>
      {isModalOpen && (
        <DashboardUpdateShippingPrices
          selectedWilaya={selectedWilaya}
          selectedMultiple={multipleSelected}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
