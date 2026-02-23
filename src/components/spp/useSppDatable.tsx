import { SppPrint } from "@/services/types/spp";
import getMonthName from "@/utils/dateUtils";
import { createColumnHelper } from "@tanstack/react-table";
import { RefObject, useState } from "react";
import { useReactToPrint } from "react-to-print";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import TableControl from "../common/table/TableControl";
import { RiFileDownloadLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import { ROUTE_SPP } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import SppService from "@/services/sppServices";

interface UseInvoiceDatatablePayload {
  printRef: RefObject<HTMLDivElement>;
}

export default function useSppDatable(payload: UseInvoiceDatatablePayload) {
  const { printRef } = payload;

  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const columnHelper = createColumnHelper<SppPrint>();
  const [selectedItems, setSelectedItems] = useState<SppPrint>();

  const columns = [
    columnHelper.display({
      id: "select-col",
      header: ({ table }) => {
        const allRows = table.getRowModel().rows;
        const selectableRows = allRows.filter(
          (row) => row.original.statusPayment.name === "Belum Bayar"
        );

        const allSelected =
          selectableRows.length > 0 &&
          selectableRows.every((row) => row.getIsSelected());

        return (
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => {
              selectableRows.forEach((row, index) => {
                row.toggleSelected(!!checked);
                // If unchecking, uncheck all 'Belum Bayar' rows below
                if (!checked) {
                  for (let i = index + 1; i < allRows.length; i++) {
                    if (
                      allRows[i].original.statusPayment.name === "Belum Bayar"
                    ) {
                      allRows[i].toggleSelected(false);
                    }
                  }
                }
              });
            }}
            onClick={(e) => e.stopPropagation()}
          />
        );
      },
      cell: ({ row, table }) => {
        const statusPayment = row.original.statusPayment.name;
        const isBelumBayar = statusPayment === "Belum Bayar";
        const isChecked = row.getIsSelected() || !isBelumBayar;

        return (
          <Checkbox
            checked={isChecked}
            disabled={!isBelumBayar}
            onCheckedChange={(checked) => {
              if (isBelumBayar) {
                row.toggleSelected(!!checked);
                const allRows = table.getRowModel().rows;
                const currentIndex = allRows.findIndex((r) => r.id === row.id);

                if (checked) {
                  // Check all 'Belum Bayar' rows above
                  for (let i = 0; i <= currentIndex; i++) {
                    if (
                      allRows[i].original.statusPayment.name === "Belum Bayar"
                    ) {
                      allRows[i].toggleSelected(true);
                    }
                  }
                } else {
                  // Uncheck all 'Belum Bayar' rows below
                  for (let i = currentIndex; i < allRows.length; i++) {
                    if (
                      allRows[i].original.statusPayment.name === "Belum Bayar"
                    ) {
                      allRows[i].toggleSelected(false);
                    }
                  }
                }
              }
            }}
            onClick={(e) => e.stopPropagation()}
          />
        );
      },
    }),
    columnHelper.display({
      id: "no-cell",
      header: () => <span>No</span>,
      cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("invoiceSpp", {
      header: () => <span>Invoice</span>,
      enableColumnFilter: false,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("month", {
      header: () => <span>Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const month = info.getValue();

        if (typeof month !== "number" || month < 1 || month > 12) {
          return "Bulan tidak valid";
        }

        return `SPP ${getMonthName(month)}`;
      },
    }),
    columnHelper.accessor("paymentDeadline", {
      header: () => <span>Tenggat Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const paymentDeadline = info.getValue();
        return paymentDeadline
          ? new Date(paymentDeadline).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "-";
      },
    }),
    columnHelper.accessor("sppAmount", {
      header: () => <span>Nominal Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const sppAmount = info.getValue();
        return `Rp ${sppAmount.toLocaleString("id-ID")}`;
      },
    }),
    columnHelper.accessor("paymentType", {
      header: () => <span>Metode Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const paymentType = info.getValue();
        const method = clsx({
          Mandiri: paymentType === "mandiri",
          Indomaret: paymentType === "indomaret",
          Alfamart: paymentType === "alfamart",
          BNI: paymentType === "bni",
          BRI: paymentType === "bri",
          BCA: paymentType === "bca",
          QRIS: paymentType === "qris",
          Tunai: paymentType === "tunai",
          "-": !paymentType,
        });
        return <span>{method}</span>;
      },
    }),
    columnHelper.accessor("settlementTime", {
      header: () => <span>Tanggal Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const settlementTime = info.getValue();
        return settlementTime
          ? new Date(settlementTime).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "-";
      },
    }),
    columnHelper.accessor("statusPayment.name", {
      header: () => <span>Status Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => (
        <span
          className={clsx(
            "font-poppins font-bold text-xs text-nowrap phone:text-[0.55rem]",
            {
              "text-hijauNormal": info.getValue() === "Lunas",
              "text-merahNormal": info.getValue() === "Belum Bayar",
              "text-kuningNormal": info.getValue() === "Menunggu Pembayaran",
            }
          )}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("year", {
      header: () => <span>Tahun Ajaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const year = info.getValue();
        const month = info.row.original.month;
        return month <= 6 ? `${year - 1}/${year}` : `${year}/${year + 1}`;
      },
    }),
    columnHelper.display({
      id: "action",
      header: () => <span>Action</span>,
      cell: ({ cell, table }) => {
        const { id, transactionId, statusPayment } = cell.row.original;

        const matchingIds = table
          .getCoreRowModel()
          .rows.filter(
            (row) => row.original.statusPayment?.name === "Menunggu Pembayaran"
          )
          .map((row) => row.original.id)
          .join(",");

        const fetchByTransactionId = async () =>
          (await SppService.getPaymentByTransactionId(transactionId ?? ""))
            .data;

        const handleView = () => {
          if (statusPayment?.name === "Menunggu Pembayaran") {
            // Retrieve the rows using TanStack Table's core row model
            // const matchingIds = table
            //   .getCoreRowModel()
            //   .rows.filter(
            //     (row) =>
            //       row.original.statusPayment?.name === "Menunggu Pembayaran"
            //   )
            //   .map((row) => row.original.id)
            //   .join(",");

            // console.log(matchingIds);

            navigate(`${ROUTE_SPP}/view-spp/${matchingIds}`);
          } else {
            navigate(`${ROUTE_SPP}/view-spp/${id}`);
          }
        };

        return (
          <div className="flex gap-2 phone:gap-1">
            <TableControl
              icon={<RiFileDownloadLine className="size-6 phone:size-4" />}
              text="Unduh"
              onClick={async () => {
                if (transactionId) {
                  setSelectedItems(await fetchByTransactionId());
                  setTimeout(handlePrint, 1000);
                } else {
                  setSelectedItems(cell.row.original);
                  setTimeout(handlePrint, 1000);
                }
              }}
            />
            <TableControl
              icon={<BsEye className="size-6 phone:size-4" />}
              text="Lihat"
              onClick={handleView}
            />
          </div>
        );
      },
    }),

    // columnHelper.display({
    //   id: "action",
    //   header: () => <span>Action</span>,
    //   cell: ({ cell }) => {
    //     // const {
    //     //   row: {
    //     //     original: {  },
    //     //   },
    //     // } = cell;
    //     const { id, transactionId } = cell.row.original;

    //     const fetchByTransactionId = async () =>
    //       (await SppService.getPaymentByTransactionId(transactionId ?? ""))
    //         .data;

    //     return (
    //       <div className="flex gap-2 phone:gap-1">
    //         <TableControl
    //           icon={<RiFileDownloadLine className="size-6 phone:size-4" />}
    //           text="Download"
    //           onClick={async () => {
    //             if (transactionId) {
    //               setSelectedItems(await fetchByTransactionId());
    //               setTimeout(handlePrint, 1000);
    //             } else {
    //               setSelectedItems(cell.row.original);
    //               setTimeout(handlePrint, 1000);
    //             }
    //           }}
    //         />
    //         <TableControl
    //           icon={<BsEye className="size-6 phone:size-4" />}
    //           text="Lihat"
    //           onClick={() => {
    //             navigate(`${ROUTE_SPP}/view-spp/${id}`, {
    //               state: { transactionId },
    //             });
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // }),
  ];

  return { columns, selectedItems, handlePrint };
}
