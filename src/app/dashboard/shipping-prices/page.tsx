"use client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";
import DashboardUpdateShippingPrices, {
  MultipleWilayaSelection,
  SelectedWilaya,
} from "@/components/dashboard/shipping-prices/DashboardUpdateShippingPrices";
import { getWilayas } from "@/lib/clientApiHelpers";
import { useStore } from "@/store";
import { Wilaya } from "@/store/wilayaSlice";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

type Props = {};

export default function ShippingPrices({}: Props) {
  const {
    wilayas: storeWilayas,
    wilayaFetchStatus,
    fetchWilayas,
    setWilayas: setStoreWilayas,
    getFilteredWilayas,
  } = useStore();

  // filtered wilayas list
  const [wilayas, setWilayas] = useState<Wilaya[]>([]);

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

  const populateSelectedWilayaList = () => {
    if (storeWilayas.length) {
      setSelectedWilayasList(
        wilayas.map(({ code, availableHome, availableOffice }, index) => ({
          code,
          selected: false,
          availableHome,
          availableOffice,
          index,
        }))
      );
    }
  };

  /**
   * Creates the logic to be able to select wilayas
   */

  const { isFetching, isSuccess, isError, refetch } = useQuery({
    queryKey: ["wilayas"],
    queryFn: getWilayas,
    refetchOnMount: true,
    onSuccess: (data) => {
      setStoreWilayas(data);
      populateSelectedWilayaList();
    },
    enabled: storeWilayas.length === 0,
  });

  useEffect(() => {
    // if the wilayas are already present, just populate the selected state
    populateSelectedWilayaList();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWilayasList(
      selectedWilayasList.map(
        ({ code, availableHome, availableOffice }, index) => ({
          code,
          selected: e.target.checked,
          availableHome,
          availableOffice,
          index,
        })
      )
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
      const filteredWilayas = getFilteredWilayas(filterTerm);
      setWilayas(filteredWilayas);
    }
  }, [filterTerm, storeWilayas]);

  const wilayaList = () => {
    if (!wilayas.length) {
      return (
        <tr className="absolute flex h-14 w-full  items-center justify-center">
          <td className="absolute w-full text-center align-middle text-stone-400">
            <p>Aucune wilaya ne corresponds à votre recherche</p>
          </td>
        </tr>
      );
    } else
      return wilayas.map(
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
          <tr
            key={code}
            className="h-12 min-h-[3rem] w-full overflow-hidden rounded-lg text-sm text-white transition-colors hover:bg-stone-600/10 [&>td]:pr-6 [&>td]:text-left [&>td]:align-middle"
          >
            <td className="rounded-bl-lg rounded-tl-lg pl-4">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={!!selectedWilayasList[idx]?.selected}
                onChange={() => handleSelectWilaya(idx)}
              />
            </td>
            <td>{code}</td>
            <td>{name}</td>
            <td>{homePrice}DA</td>
            <td>{officePrice}DA</td>
            <td
              className={`${availableHome ? "text-secondary" : "text-red-500"}`}
            >
              {availableHome ? "Disponible" : "Non disponible"}
            </td>
            <td
              className={`${
                availableOffice ? "text-secondary" : "text-red-500"
              }`}
            >
              {availableOffice ? "Disponible" : "Non disponible"}
            </td>
            <td className="rounded-br-lg rounded-tr-lg">
              <button
                type="button"
                title="Modifier les prix de livraisons"
                className="h-8 w-8 rounded-lg transition-colors dark:hover:bg-stone-800 dark:focus:bg-stone-900/50"
                onClick={() => openModal(idx)}
              >
                <MdEdit className="h-5 w-5" />
              </button>
            </td>
          </tr>
        )
      );
  };

  const loadingSkeleton = Array.from({ length: 18 }, (_, i) => (
    <tr
      key={i}
      className="h-12 min-h-[3rem] w-full animate-pulse [&>td>div]:h-4 [&>td>div]:rounded-md [&>td>div]:bg-stone-800 [&>td]:text-left [&>td]:align-middle"
    >
      <td className="rounded-bl-lg rounded-tl-lg pl-4">
        <div className="h-4 w-4"></div>
      </td>
      <td>
        <div className="h-4 w-10/12"></div>
      </td>
      <td>
        <div className="h-4 w-10/12"></div>
      </td>
      <td>
        <div className="h-4 w-10/12"></div>
      </td>
      <td>
        <div className="h-4 w-10/12"></div>
      </td>
      <td>
        <div className="h-4 w-10/12"></div>
      </td>
      <td>
        <div className="h-4 w-10/12"></div>
      </td>
      <td className="rounded-br-lg rounded-tr-lg">
        <div className="h-4 w-8"></div>
      </td>
    </tr>
  ));

  return (
    <div
      id="shipping-prices"
      className="flex w-full grow flex-col overflow-y-hidden py-3 pl-6"
    >
      <DashboardHeader label="Prix de livraisons" />
      {/* ----------------------------------------------------------- */}
      <section
        id="shipping-prices-toolbar"
        className="mr-6 flex h-16 min-h-[4rem] items-center justify-between"
      >
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-1 rounded-md bg-primary px-4 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-stone-800 disabled:text-stone-400 dark:bg-blue-600 dark:hover:bg-secondary dark:focus:bg-blue-700 dark:disabled:bg-stone-900 dark:disabled:text-stone-600"
          onClick={() => {
            // reset the selected wilaya to tell the update component that multiple wilayas should be modified
            setSelectedWilaya(null);
            setIsModalOpen(true);
          }}
          disabled={multipleSelected.length < 1}
        >
          <MdEdit className="h-6 w-6" /> Modifier la sélection
        </button>

        <DashboardSearchInput
          placeholder="Chercher une wilaya"
          onChange={handleSearchInputChange}
        />
      </section>
      {/* ----------------------------------------------------------- */}

      {/* new Body  */}

      <section
        className={clsx(
          "relative h-full w-full overflow-x-hidden pr-2 dark:[color-scheme:dark]",
          isSuccess && "overflow-y-auto"
        )}
      >
        <table className="w-full table-fixed">
          <thead>
            <tr className="sticky top-0 z-10 h-14 min-h-[5rem] w-full border-0 border-hidden bg-white dark:bg-dark align-middle text-sm text-stone-500 dark:bg-dark-background [&>th]:text-left">
              <th className="w-14 items-center pl-4 2xl:w-20">
                <input
                  id="select-all-checkbox"
                  type="checkbox"
                  onChange={handleSelectAll}
                  className="h-4 w-4"
                  disabled={wilayaFetchStatus !== "success"}
                />
              </th>
              <th className="w-20">#</th>
              <th className="w-44 2xl:w-44">Nom</th>
              <th className="w-40" title="Prix de livraison à domicile">
                Prix à domicile
              </th>
              <th className="w-40" title="Prix de livraison au bureau">
                Prix au bureau
              </th>
              <th className="w-48">Disponibilité à domicile</th>
              <th className="w-48">Disponibilité au bureau</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="h-full text-sm text-white">
            {isFetching && loadingSkeleton}

            {isSuccess && wilayaList()}

            {isError && (
              <tr className="absolute flex w-full flex-col items-center h-full justify-center">
                <td className="flex flex-col items-center justify-center gap-2 -translate-y-20">
                  <div className="flex items-center justify-center rounded-full border-4 w-10 h-10 text-xl font-bold text-red-500 border-red-500">
                    !
                  </div>
                  <p className="mt-2 text-stone-400">
                    Une érreur est survenu lors de la recherche des wilayas
                  </p>
                  <button
                    type="button"
                    className="h-9 px-4 rounded-lg  font-semibold text-stone-100 transition-colors dark:hover:bg-stone-900/70  dark:focus:bg-stone-950 "
                    onClick={() => refetch}
                  >
                    Réessayer
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="h-10 w-full bg-red-500"></div> */}
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
