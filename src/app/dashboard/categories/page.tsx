"use client";

import ModalLoader from "@/components/ModalLoader";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchInput from "@/components/dashboard/DashboardSearchInput";
import DashboardCategoryCard from "@/components/dashboard/categories/DashboardCategoryCard";
import DashboardCategoryPagination from "@/components/dashboard/categories/DashboardCategoryPagination";
import DashboardUpdateCategory from "@/components/dashboard/categories/DashboardUpdateCategory";
import { getCategories } from "@/lib/clientApiHelpers";
import { useStore } from "@/store";
import { CategoryDataOpen } from "@/store/dashboardSlice";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useState } from "react";
import { MdAdd, MdMoreVert } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";

const AddCategory = dynamic(
  () => import("@/components/dashboard/categories/DashboardAddCategory"),
  { loading: () => <ModalLoader /> }
);

const DashboardAddSubCategory = dynamic(
  () => import("@/components/dashboard/categories/DashboardAddSubCategory"),
  { loading: () => <ModalLoader /> }
);
const DashboardDeleteCategory = dynamic(
  () => import("@/components/dashboard/categories/DashboardDeleteCategory"),
  { loading: () => <ModalLoader /> }
);

type Props = {};

export default function Categories({}: Props) {
  const {
    deleteCategoryData,
    setDeleteCategoryData,
    editCategoryData,
    setEditCategoryData,
    showSnackbar,
  } = useStore();
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  // holds the wilaya id which the sub-category should be connected to
  const [isAddSubCategoryOpen, setIsAddSubCategoryOpen] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const closeAddSubcategory = () => setIsAddCategoryOpen(false);
  const closeAddSubCategory = () => setIsAddSubCategoryOpen(null);
  const closeDeleteConfirm = () => setDeleteCategoryData({ isOpen: false });
  const closeEdit = () => setEditCategoryData({ isOpen: false });

  const { isFetching, data, refetch, isError, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const loadingSkeleton = Array.from({ length: 12 }, (_, i) => {
    return (
      <div
        className="h-14 flex items-center bg-stone-950 rounded-lg px-4 justify-between animate-pulse"
        key={i}
      >
        <div className="h-6 bg-stone-700 w-1/6 rounded-md"></div>
        <div className="text-stone-700 transition-colors h-8 w-8 rounded-lg">
          <MdMoreVert className="h-7 w-7" />
        </div>
      </div>
    );
  });

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil((data ? data.length : 0) / itemsPerPage);

  const handlePaginationClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % (data?.length ?? 0);
    setItemOffset(newOffset);
  };

  const displayData = () => {
    if (isFetching) return loadingSkeleton;
    if (isSuccess) {
      if (data.length === 0) {
        return (
          <div className="grow flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 -translate-y-20">
              <TbCategory2 className="w-20 h-20" />
              <p>Aucune catégories n'a encore été ajoutée</p>
              <button
                type="button"
                className="px-2 h-10  rounded-lg text-stone-50 font-semibold dark:hover:bg-stone-900 dark:focus:bg-stone-900/70 transition-colors"
                onClick={() => setIsAddCategoryOpen(true)}
              >
                <MdAdd className="w-7 h-7" /> Ajouter une catégorie
              </button>
            </div>
          </div>
        );
      } else {
        const currentItems = data.slice(itemOffset, endOffset);

        return currentItems.map(
          ({ id, name, subCategories: subCategroies }) => {
            const categoryData: CategoryDataOpen = {
              isOpen: true,
              id,
              name,
              type: "category",
            };
            return (
              <DashboardCategoryCard
                categoryName={name}
                categoryId={id}
                key={id}
                subCategories={subCategroies}
                openAddSubCategory={() => setIsAddSubCategoryOpen({ name, id })}
                onDeleteClick={() => setDeleteCategoryData(categoryData)}
                onEditClick={() => setEditCategoryData(categoryData)}
              />
            );
          }
        );
      }
    }

    if (isError) {
      return (
        <DashboardFetchError
          text="Une érreur est survenu lors de recherche des catégories"
          refetch={refetch}
        />
      );
    }
  };

  return (
    <div
      id="Catégories"
      className="flex w-full grow flex-col overflow-y-hidden px-5 pt-3 justify-between dark:[color-scheme:dark]"
    >
      <div className="flex flex-col w-full grow overflow-y-hidden px-1">
        <DashboardHeader label="Categories" noPadding />
        <div
          id="categories-toolbar"
          className="flex h-16 min-h-[4rem] w-full items-center justify-between "
        >
          <button
            type="button"
            className="px-2 h-10 bg-blue-600 rounded-lg text-stone-50 font-semibold hover:bg-secondary focus:bg-blue-700 transition-colors"
            onClick={() => setIsAddCategoryOpen(true)}
          >
            <MdAdd className="w-7 h-7" /> Ajouter une catégorie
          </button>
          <DashboardSearchInput placeholder="Chercher une catégorie" />
        </div>
        <section className="relative flex flex-col w-full grow text-stone-50 gap-4 overflow-y-auto">
          {displayData()}
        </section>
      </div>

      <DashboardCategoryPagination
        onPageChange={handlePaginationClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />

      {isAddCategoryOpen && <AddCategory closeModal={closeAddSubcategory} />}
      {!!isAddSubCategoryOpen && (
        <DashboardAddSubCategory
          category={isAddSubCategoryOpen}
          closeModal={closeAddSubCategory}
        />
      )}
      {!!deleteCategoryData.isOpen && (
        <DashboardDeleteCategory
          closeModal={closeDeleteConfirm}
          deleteData={deleteCategoryData}
        />
      )}
      {!!editCategoryData.isOpen && (
        <DashboardUpdateCategory
          closeModal={closeEdit}
          editData={editCategoryData}
        />
      )}
    </div>
  );
}