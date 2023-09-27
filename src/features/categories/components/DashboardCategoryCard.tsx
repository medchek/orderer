import { MdAdd, MdMoreVert } from "react-icons/md";
import DashboardCategoryDropdown from "./DashboardCategoryDropdown";
import { useStore } from "@/store";
import { CategoryDataOpen } from "@/store/dashboardSlice";

interface Props {
  openAddSubCategory: () => void;
  categoryName: string;
  categoryCode: string;
  subCategories?: { name: string; code: string }[];
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export default function DashboardCategoryCard({
  categoryName,

  subCategories,
  onDeleteClick,
  onEditClick,
  openAddSubCategory,
}: Props) {
  const { setDeleteCategoryData, setEditCategoryData } = useStore();

  return (
    <div className="flex flex-col rounded-lg bg-stone-950 px-4 py-1 ">
      <section className="flex h-12 w-full items-center justify-between first-letter:capitalize">
        <p className="font-semibold first-letter:capitalize">{categoryName}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="h-8 w-8 rounded-lg transition-colors dark:hover:bg-stone-800/70 dark:focus:bg-stone-900"
            title="Ajouter une sous-catégorie"
            onClick={openAddSubCategory}
          >
            <MdAdd className="h-7 w-7" />
          </button>

          <DashboardCategoryDropdown
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />

          {/* <button
            type="button"
            className="dark:focus:bg-stone-900 dark:hover:bg-stone-800/70 transition-colors h-8 w-8 rounded-lg"
            title="éditer ou supprimer"
          ></button> */}
        </div>
      </section>
      {subCategories && subCategories.length ? (
        <section className="relative flex min-h-[3rem] flex-wrap items-center gap-4 border-t border-stone-900 pb-2 pt-3">
          {subCategories?.map(({ code, name }) => {
            const subcategoryData: CategoryDataOpen = {
              isOpen: true,
              code,
              name,
              type: "subcategory",
            };

            return (
              <div
                key={code}
                className="flex items-center justify-between gap-6 rounded-lg bg-stone-900 py-1.5 pl-4 pr-2 text-stone-400"
              >
                <p className="first-letter:capitalize">{name}</p>
                <DashboardCategoryDropdown
                  className="h-7 w-7 rounded-md transition-colors dark:hover:bg-stone-800 dark:focus:bg-stone-950/50"
                  onEditClick={() => setEditCategoryData(subcategoryData)}
                  onDeleteClick={() => setDeleteCategoryData(subcategoryData)}
                >
                  <MdMoreVert className="h-6 w-6" />
                </DashboardCategoryDropdown>
              </div>
            );
          })}
        </section>
      ) : null}
    </div>
  );
}
