"use client";

import ModalLoader from "@/components/ModalLoader";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import DashboardFetchError from "@/components/dashboard/DashboardFetchError";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useGetCategories } from "@/features/categories/api/getCategories";
import DashboardCategoryCard from "@/features/categories/components/DashboardCategoryCard";
import DashboardCategoryPagination from "@/features/categories/components/DashboardCategoryPagination";
import DashboardCategoryToolbar from "@/features/categories/components/DashboardCategoryToolbar";

import { useStore } from "@/store";
import { CategoryDataOpen } from "@/store/dashboardSlice";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MdAdd, MdMoreVert } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";

const AddCategory = dynamic(
  () => import("@/features/categories/components/DashboardAddCategory"),
  { loading: () => <ModalLoader /> },
);

const DashboardAddSubCategory = dynamic(
  () => import("@/features/categories/components/DashboardAddSubCategory"),
  { loading: () => <ModalLoader /> },
);
const DashboardDeleteCategory = dynamic(
  () => import("@/features/categories/components/DashboardDeleteCategory"),
  { loading: () => <ModalLoader /> },
);

const DashboardUpdateCategory = dynamic(
  () => import("@/features/categories/components/DashboardUpdateCategory"),
  { loading: () => <ModalLoader /> },
);

export default function Categories() {
  const {
    deleteCategoryData,
    setDeleteCategoryData,
    editCategoryData,
    setEditCategoryData,
    categoryFilterTerm: filterTerm,
    categoryFilterType: filterType,
    categoryPerPage,
  } = useStore();
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  // holds the wilaya id which the sub-category should be connected to
  const [isAddSubCategoryOpen, setIsAddSubCategoryOpen] = useState<{
    code: string;
    name: string;
  } | null>(null);

  const closeAddSubcategory = () => setIsAddCategoryOpen(false);
  const closeAddSubCategory = () => setIsAddSubCategoryOpen(null);
  const closeDeleteConfirm = () => setDeleteCategoryData({ isOpen: false });
  const closeEdit = () => setEditCategoryData({ isOpen: false });

  const { isFetching, data, refetch, isError, isSuccess } = useGetCategories({
    select: (data) => {
      if (filterTerm) {
        if (filterType === "category") {
          return data.filter((cat) =>
            cat.name.toLowerCase().includes(filterTerm),
          );
        } else {
          return data.filter((cat) => {
            const subcategories = cat.subCategories;
            if (!subcategories) return false;

            for (const subcat of subcategories) {
              if (subcat.name.toLowerCase().includes(filterTerm)) {
                return true;
              }
            }
          });
        }
      } else {
        return data;
      }
    },
  });

  const loadingSkeleton = Array.from({ length: 12 }, (_, i) => {
    return (
      <div
        className="flex h-14 animate-pulse items-center justify-between rounded-lg bg-neutral-200 px-4 dark:bg-stone-950"
        key={i}
      >
        <div className="h-6 w-1/6 rounded-md bg-neutral-300 dark:bg-stone-700"></div>
        <div className="size-8 rounded-lg text-neutral-500 transition-colors dark:text-stone-700">
          <MdMoreVert className="size-7" />
        </div>
      </div>
    );
  });

  // pagination
  const [itemOffset, setItemOffset] = useState(0);
  // track the pagination currently selected page number
  const [selectedPageNumber, setSelectedPageNumber] = useState(0);
  const endOffset = itemOffset + categoryPerPage;
  const pageCount = Math.ceil((data ? data.length : 0) / categoryPerPage);

  const currentItems = data?.slice(itemOffset, endOffset);
  // in case of a delete request, the pages that would result in 0 displayed items
  // should redirect to the previous page in the pagination
  useEffect(() => {
    if (isSuccess && currentItems) {
      if (!currentItems.length) {
        if (selectedPageNumber > 0) {
          // calculate the new offset
          setSelectedPageNumber(selectedPageNumber - 1);
          const previousPage =
            ((selectedPageNumber - 1) * categoryPerPage) % (data?.length ?? 0);
          setItemOffset(previousPage);
        }
      }
    }
  }, [currentItems, isSuccess]);

  const handlePaginationClick = (event: { selected: number }) => {
    const newOffset = (event.selected * categoryPerPage) % (data?.length ?? 0);
    // track the current page
    setSelectedPageNumber(event.selected);
    // set the new offset
    setItemOffset(newOffset);
  };

  const displayData = () => {
    if (isFetching) return loadingSkeleton;
    if (isSuccess) {
      if (data.length === 0) {
        return (
          <DashboardEmptyState
            Icon={<TbCategory2 className="size-20" />}
            text={
              filterTerm
                ? `Aucune ${
                    filterType === "category" ? "catégorie" : "sous-catégorie"
                  } n'a été trouvée avec ce nom`
                : "Aucune catégorie n'a encore été ajoutée"
            }
            subContent={
              <button
                type="button"
                className="h-10 rounded-lg px-2 font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-900 dark:active:bg-neutral-900/70"
                onClick={() => setIsAddCategoryOpen(true)}
              >
                <MdAdd className="size-7" /> Ajouter une catégorie
              </button>
            }
          />
        );
      } else {
        return currentItems?.map(
          ({ code, name, subCategories: subCategroies }) => {
            const categoryData: CategoryDataOpen = {
              isOpen: true,
              code,
              name,
              type: "category",
            };
            return (
              <DashboardCategoryCard
                categoryName={name}
                categoryCode={code}
                key={code}
                subCategories={subCategroies}
                openAddSubCategory={() =>
                  setIsAddSubCategoryOpen({ name, code })
                }
                onDeleteClick={() => setDeleteCategoryData(categoryData)}
                onEditClick={() => setEditCategoryData(categoryData)}
              />
            );
          },
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
      className="flex w-full grow flex-col justify-between overflow-y-hidden px-5 pt-3 dark:[color-scheme:dark]"
    >
      <div className="flex w-full grow flex-col overflow-y-hidden px-1">
        <DashboardHeader label="Categories" noPadding />
        <DashboardCategoryToolbar
          openAddCategory={() => setIsAddCategoryOpen(true)}
        />
        <section className="relative flex w-full grow flex-col gap-4 overflow-y-auto text-neutral-900 dark:text-stone-50">
          {displayData()}
        </section>
      </div>

      <DashboardCategoryPagination
        onPageChange={handlePaginationClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={selectedPageNumber}
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
