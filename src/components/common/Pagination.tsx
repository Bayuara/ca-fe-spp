import clsx from "clsx";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

interface IPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage: number;
  onPageChange: (val: number) => void;
}

export interface IPaginationRef {
  setPage: (val: number) => void;
}

const Pagination = forwardRef<IPaginationRef, IPaginationProps>(
  (props, ref) => {
    const { initialPage, totalItems, itemsPerPage, onPageChange } = props;

    const [currentPage, setCurrentPage] = useState(initialPage);

    const totalPages = useMemo(() => {
      return Math.ceil(totalItems / itemsPerPage);
    }, [totalItems, itemsPerPage]);

    const paginationList = useMemo(() => {
      let pagination: (string | number)[] = [];

      if (totalPages <= 7) {
        pagination = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        if (currentPage <= 4) {
          pagination = [1, 2, 3, 4, "...", totalPages];
        } else if (currentPage >= totalPages - 3) {
          pagination = [
            1,
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
          ];
        } else {
          pagination = [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
          ];
        }
      }

      return pagination;
    }, [currentPage, totalPages]);

    useEffect(() => {
      onPageChange(currentPage);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useImperativeHandle(ref, () => {
      return {
        setPage: (val) => setCurrentPage(val),
      };
    }, []);

    return (
      <div className="flex justify-end mt-4">
        <button
          disabled={currentPage === 1}
          className="bg-white border border-gray-400 rounded-l-lg p-1 phone:py-0.5 text-sm phone:text-[0.55rem]"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {paginationList.map((pl, i) => {
          if (typeof pl === "string") return "...";

          const isActive = pl === currentPage;
          return (
            <button
              className={clsx(
                "border border-gray-400 p-1 phone:py-0.5 text-sm phone:text-[0.55rem]",
                { "text-white bg-hijauNormal": isActive },
                { "bg-white": !isActive }
              )}
              key={i}
              onClick={() => setCurrentPage(pl)}
            >
              {pl}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          className="bg-white border rounded-r-lg border-gray-400 p-1 px-3 phone:py-0.5 phone:px-2 text-sm phone:text-[0.55rem] phone:leadi"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }
);

export default Pagination;
