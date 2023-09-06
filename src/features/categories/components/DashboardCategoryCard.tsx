import { MdAdd, MdMoreVert } from "react-icons/md";
import DashboardCategoryDropdown from "./DashboardCategoryDropdown";
import { useStore } from "@/store";
import { CategoryDataOpen } from "@/store/dashboardSlice";

interface Props {
  openAddSubCategory: () => void;
  categoryName: string;
  categoryId: number;
  subCategories?: { name: string; id: number }[];
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
    <div className="py-1 flex flex-col bg-stone-950 rounded-lg px-4 ">
      <section className="h-12 w-full flex items-center justify-between first-letter:capitalize">
        <p className="font-semibold first-letter:capitalize">{categoryName}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="dark:focus:bg-stone-900 dark:hover:bg-stone-800/70 transition-colors h-8 w-8 rounded-lg"
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
        <section className="relative min-h-[3rem] border-t border-stone-900 flex items-center pt-3 pb-2 gap-4 flex-wrap">
          {subCategories?.map(({ id, name }) => {
            const subcategoryData: CategoryDataOpen = {
              isOpen: true,
              id,
              name,
              type: "subcategory",
            };

            return (
              <div
                key={id}
                className="bg-stone-900 flex justify-between pl-4 pr-2 text-stone-400 py-1.5 gap-6 items-center rounded-lg"
              >
                <p className="first-letter:capitalize">{name}</p>
                <DashboardCategoryDropdown
                  className="dark:focus:bg-stone-950/50 dark:hover:bg-stone-800 transition-colors h-7 w-7 rounded-md"
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
