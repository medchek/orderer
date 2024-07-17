import DashboardPagination from "@/components/dashboard/DashboardPagination";
import { useStore } from "@/store";
import { type ReactPaginateProps } from "react-paginate";

interface Props extends ReactPaginateProps {}

export default function DashboardCategoryPagination({ ...props }: Props) {
  const { categoryPerPage, setCategoryPerPage } = useStore();

  return (
    <div className="relative flex h-14 min-h-[3.5rem] w-full items-center justify-center">
      <DashboardPagination
        {...props}
        pageRangeDisplayed={3}
        renderOnZeroPageCount={null}
        perPageDisplay={{
          setPerPageCount: setCategoryPerPage,
          count: categoryPerPage,
          text: "catégories",
        }}
      />
    </div>
  );
}
