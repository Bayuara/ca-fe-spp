/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useRef } from "react";
import clsx from "clsx";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import MukaMerah from "../../../assets/mukamerah.svg";
import { FiRotateCw } from "react-icons/fi";
import Pagination, { IPaginationRef } from "../Pagination";
import { toast } from "sonner";
import useWrapInvalidToken from "@/presentation/components/hooks/useWrapInvalidToken";
import SearchCell from "./searchCell";

interface TableProps<T> {
  columns: ColumnDef<T, any>[];
  fetchData?: (
    ...args: any
  ) => Promise<{ data: T[]; page: { totalItems: number } }>;
  limit?: number;
  page?: number;
  refetch?: boolean;
  getParams?: () => object;
  data?: T[];
  getRowId?: (val: T) => number;
  // onRowSelectionChange?: (values: number[] | T[]) => void;
  onSelectionChange?: (selectedIds: number[]) => void;
  onRowClick?: (val: T) => void;
  onParamsChange?: (val: unknown) => void;
  alignment?: string;

  // selectPrevData?: boolean;
}

function DataTable<T>(props: TableProps<T>) {
  const {
    columns,
    fetchData,
    limit = 6,
    page,
    // onRowSelectionChange,
    data: parentData,
    getParams,
    refetch,
    getRowId,
    onSelectionChange,
    onRowClick,
    onParamsChange = () => {},
    alignment = "middle",
    // selectPrevData,
  } = props;
  const [data, setData] = useState<T[]>(parentData ?? []);
  const [loading, setLoading] = useState(true);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns,
    data,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: getRowId ?? ((row) => (row as any).id),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    state: { rowSelection, columnFilters },
  });

  const wrappedFetchData = useWrapInvalidToken(fetchData!);

  const [pageData, setPageData] = useState({
    totalItems: data.length,
    limit,
    page: page ?? 1,
  });

  useEffect(() => {
    let active = true;
    let loadingTimeout: NodeJS.Timeout | null = null;

    const loadData = async () => {
      setLoading(true);

      try {
        if (!fetchData) return;

        let params: any = {
          limit: pageData.limit,
          offset: pageData.page,
        };

        columnFilters.forEach((filter) => {
          params[filter.id] = filter.value;
        });

        if (getParams) {
          params = {
            ...params,
            ...getParams(),
          };
        }

        const result = await wrappedFetchData(params);

        if (!active) return;

        onParamsChange(params);

        setData(result.data ?? []);
        setPageData((oldPageData) => ({
          ...oldPageData,
          totalItems: result.page?.totalItems ?? 0,
        }));

        // console.log("Fetched result in DataTable: ", result);
      } catch (error) {
        // console.log("Error fetching data: ", error);
        toast.error("Error saat mengambil Data: " + error);
      } finally {
        loadingTimeout = setTimeout(() => setLoading(false), 500);
      }
    };

    const fetchTimeout = setTimeout(loadData, 1000);

    return () => {
      active = false;
      clearTimeout(fetchTimeout);
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pageData.limit,
    pageData.page,
    fetchData,
    getParams,
    refetch,
    columnFilters,
  ]);

  useEffect(() => {
    const x = setTimeout(() => {
      paginationRef.current?.setPage(1);
    }, 750);

    return () => {
      clearTimeout(x);
    };
  }, [refetch, getParams, columnFilters]);

  useEffect(() => {
    if (onSelectionChange) {
      const selectedIds = Object.keys(rowSelection)
        .filter((key) => rowSelection[key])
        .map(Number);
      // console.log("Selected IDs in DataTable:", selectedIds); // Debugging
      onSelectionChange(selectedIds);
    }
  }, [rowSelection, onSelectionChange]);

  const hasData = useMemo(() => {
    return data.length > 0;
  }, [data]);

  const paginationRef = useRef<IPaginationRef>(null);

  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto rounded-xl border border-hitamNormal">
        <table className="bg-putihLightActive font-poppins text-sm w-full">
          <thead className="bg-hijauLightActive border-b border-hitamNormal">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      "p-2 pb-2 laptop:pb-2 laptop:p-3 text-sm phone:text-[0.55rem] first:min-w-10 leading-4 ",
                      {
                        "align-top": alignment === "top",
                        "align-middle": alignment !== "top",
                      },
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanFilter() ? (
                      <div className="mt-2">
                        <SearchCell
                          column={header.column}
                          placeholder="Search..."
                        />
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="h-40 text-center">
                  <div className="flex justify-center items-center gap-4">
                    <FiRotateCw className="animate-spin-clockwise" /> Loading...
                  </div>
                </td>
              </tr>
            ) : null}
            {hasData && !loading
              ? table.getRowModel().rows.map((row, i) => {
                  return (
                    <tr
                      key={row.id}
                      onClick={() => {
                        if (onRowClick) {
                          onRowClick(data[i]);
                        }
                      }}
                      className={clsx(
                        "text-center items-center phone:text-[0.55rem] phone:leading-3 border-b border-black last:border-b-0",
                        {
                          "hover:bg-putihNormalHover cursor-pointer":
                            typeof onRowClick === "function",
                        },
                      )}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const isNumberCell = cell.id.includes("no-cell");

                        const no =
                          pageData.page === 1
                            ? i + 1
                            : i + (pageData.page - 1) * pageData.limit + 1;

                        return (
                          <td
                            key={cell.id}
                            className={clsx(
                              "p-2 tablet:p-3 laptop:p-4 text-nowrap",
                            )}
                          >
                            {isNumberCell
                              ? no
                              : flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              : null}
            {!hasData && !loading ? (
              <tr>
                <td colSpan={columns.length} className="h-40 text-center">
                  <div className="flex flex-col justify-center items-center p-8 mt-8">
                    <img
                      src={MukaMerah}
                      alt="No Data"
                      className="size-32 laptop:size-40"
                    />
                    <p className="py-4 text-putihDarkHover">
                      Data tidak tersedia.
                    </p>
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-1">
        <Pagination
          ref={paginationRef}
          initialPage={pageData.page}
          itemsPerPage={pageData.limit}
          totalItems={pageData.totalItems}
          onPageChange={(val) => setPageData({ ...pageData, page: val })}
        />
      </div>
    </div>
  );
}

export default DataTable;
