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
import { Fragment } from "react";
// import Button from "../common/Button";
// import { toast } from "sonner";

interface UseInvoiceDatatablePayload {
  printRef: RefObject<HTMLDivElement>;
}

export default function useWaitingSppDatable(
  payload: UseInvoiceDatatablePayload
) {
  const { printRef } = payload;

  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const columnHelper = createColumnHelper<SppPrint>();
  const [selectedWaitingItems, selectSelectedWaitingItems] =
    useState<SppPrint>();
  // const [selectedTransactionId, setSelectedTransactionId] = useState<
  //   string | null
  // >(null);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);

  const columnsWaiting = [
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
      cell: (info) => {
        const value = info.getValue();
        const invoices = Array.isArray(value) ? value : [value];

        return (
          <>
            {invoices.map((invoice, index) => (
              <Fragment key={index}>
                {invoice}
                {index < invoices.length - 1 && <br />}
              </Fragment>
            ))}
          </>
        );
      },
    }),
    columnHelper.accessor("month", {
      header: () => <span>Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const value = info.getValue();

        // Periksa apakah 'value' adalah array
        const months = Array.isArray(value) ? value : [value];

        return `SPP ${months.map(getMonthName).join(", ")}`;
      },
    }),
    columnHelper.accessor("paymentDeadline", {
      header: () => <span>Tenggat Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const value = info.getValue();
        const deadlines = Array.isArray(value) ? value : [value];

        return (
          <>
            {deadlines.map((deadline, index) => (
              <Fragment key={index}>
                {new Date(deadline).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                {index < deadlines.length - 1 && <br />}
              </Fragment>
            ))}
          </>
        );
      },
    }),
    columnHelper.accessor("totalAmount", {
      header: () => <span>Nominal Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const totalAmount = info.getValue();
        return totalAmount !== undefined
          ? `Rp ${totalAmount.toLocaleString("id-ID")}`
          : "Rp 0";
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
      enableColumnFilter: false,
      cell: ({ cell }) => {
        const {
          row: {
            original: { id },
          },
        } = cell;

        return (
          <div className="flex gap-2 phone:gap-1">
            <TableControl
              icon={<RiFileDownloadLine className="size-6 phone:size-4" />}
              text="Unduh"
              onClick={(e) => {
                console.log("button clicked");
                e.stopPropagation();
                selectSelectedWaitingItems(cell.row.original);
                setTimeout(handlePrint, 2000);
              }}
            />
            <TableControl
              icon={<BsEye className="size-6 phone:size-4" />}
              text="Lihat"
              onClick={() => {
                navigate(`${ROUTE_SPP}/view-spp/${id}`, {});
              }}
            />
          </div>
        );
      },
    }),
  ];

  return {
    columnsWaiting,
    selectedWaitingItems,
    // selectedTransactionId,
    handlePrint,
    isConfirmationModal,
    setIsConfirmationModal,
  };
}
