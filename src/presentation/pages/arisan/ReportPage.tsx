import { useCallback, useEffect, useRef, useState } from "react";
import { useLayout } from "@/presentation/components/hooks/useLayout";
import DataTable from "@/presentation/components/common/table/DataTable";
import { Arisan, arisanStatusPayment } from "@/services/types/arisan";
import { createColumnHelper } from "@tanstack/react-table";
import TableControl from "@/presentation/components/common/table/TableControl";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { Badge } from "@/presentation/components/ui/badge";
import { useReactToPrint } from "react-to-print";
import ArisanDetailPrint from "../../components/arisan/ArisanDetailPrint";
import { FiFilter } from "react-icons/fi";
import Navbar from "@/presentation/components/arisan/Navbar";
import Button from "@/presentation/components/common/Button";
import { PiBoxArrowDown } from "react-icons/pi";
import ArisanService from "@/services/arisanServices";
import { useSearchParams } from "react-router-dom";
import ArisanFilterModal, {
  ArisanFilterModalValue,
} from "@/presentation/components/arisan/ArisanFilterModal";
import Chip from "@/presentation/components/arisan/Chip";
import useChipFilter from "@/presentation/components/arisan/useChipFilter";
import { dateFormat } from "@/utils/dateUtils";

const fetchArisanStatusPaymentData = async () =>
  (await ArisanService.getPaymentByStatus()).data;

const ReportPage = () => {
  const [printItems, setPrintItems] = useState<Arisan[]>([]);
  const [filter, setFilter] = useState<ArisanFilterModalValue>({});
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [searchParams] = useSearchParams();
  const Token = searchParams.get("token");

  useEffect(() => {
    if (Token) {
      localStorage.setItem("Token", Token);
    }
  }, [Token]);

  const { setHideLayout } = useLayout();
  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const printRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   console.log("isi filter: ", filter);
  // }, [filter]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const columnHelper = createColumnHelper<Arisan>();
  const columns = [
    columnHelper.display({
      id: "no-cell",
      header: () => <span>No</span>,
      cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("name", {
      header: () => <span>Nama</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("arisanDate", {
      header: () => <span>Tanggal Pengundian</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const dateValue = new Date(info.getValue()); // Konversi ke objek Date
        return new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(dateValue); // Format sesuai dengan lokal Indonesia
      },
    }),
    columnHelper.accessor("paymentDate", {
      header: () => <span>Tanggal Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const value = info.getValue();

        if (!value) {
          return "-";
        }

        const dateValue = new Date(value);
        return new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(dateValue);
      },
    }),

    columnHelper.accessor("arisanAmount", {
      header: () => <span>Nominal Pembayaran</span>,
      enableColumnFilter: false,
      cell: (info) => `Rp ${info.getValue().toLocaleString("id-ID")}`,
    }),
    columnHelper.accessor("statusPayment.name", {
      header: () => <span>Status</span>,
      enableColumnFilter: false,
      cell: (info) => {
        const val = info.getValue();

        if (val === "Belum Bayar")
          return (
            <Badge
              variant="destructive"
              className="w-5/6 justify-center phone:text-[0.55rem]"
            >
              {val}
            </Badge>
          );

        return (
          <Badge className="w-5/6 text-center justify-center phone:text-[0.55rem]">
            {val}
          </Badge>
        );
      },
    }),
    columnHelper.display({
      id: "action",
      header: () => <span>Action</span>,
      cell: ({ cell }) => {
        // const {
        //   row: {
        //     original: { id },
        //   },
        // } = cell;
        return (
          <div className="flex gap-2 justify-center">
            <TableControl
              icon={
                <BsFillFileEarmarkArrowDownFill className="size-6 fill-hijauNormal text-hijauNormal phone:size-4" />
              }
              text="Download"
              onClick={() => {
                setPrintItems([cell.row.original]);
                setTimeout(handlePrint, 1000);
              }}
            />
          </div>
        );
      },
    }),
  ];

  const getParams = useCallback(() => {
    const params: {
      statusPaymentId?: number;
      arisanDate?: string;
      paymentDate?: string;
    } = {};

    if (filter.paymentStatus) params.statusPaymentId = filter.paymentStatus.id;
    if (filter.arisanDate) params.arisanDate = filter.arisanDate;
    if (filter.paymentDate) params.paymentDate = filter.paymentDate;
    return params;
  }, [filter]);

  const chips = useChipFilter(filter, (val, key) => {
    if (key === "paymentStatus") return (val as arisanStatusPayment)?.name;
    if (val) return dateFormat({ str: val as string });
    return "";
  });

  const handleDownloadAll = async () => {
    const params = getParams();
    const response = await ArisanService.gets(params);
    setPrintItems(response.data);
    setTimeout(handlePrint, 1000);
  };

  return (
    <>
      <div className="py-4 px-4 laptop:px-12">
        <Navbar />
        <div className="my-8 space-y-4 phone:mb-3">
          <h1 className="text-black text-3xl phone:text-xl font-bold">
            Pembayaran Arisan
          </h1>
          <div className="border border-black" />
          <div className="flex items-center gap-4">
            <Button
              iconSuffix={<FiFilter className="fill-hijauNormal" />}
              variant="custom"
              rounded="lg"
              className="text-hijauNormal w-2/12 gap-4 border shadow drop-shadow-2xl phone:text-xs"
              onClick={() => setOpenFilterModal(true)}
            >
              Filter
            </Button>
            <Button
              iconPrefix={<PiBoxArrowDown className="h-6 w-6 phone:size-4" />}
              className="!font-medium px-6 bg-[#FDAA08] text-putihLight rounded-lg transition-all duration-300 ease-in-out hover:bg-[#75571f] hover:text-gray-200 phone:text-xs"
              rounded="lg"
              variant="custom"
              onClick={handleDownloadAll}
            >
              Unduh Semua Data
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 phone:gap-2 phone:mb-4">
          {chips.map((chip) => {
            return (
              <Chip
                key={chip?.name}
                text={chip?.text ?? ""}
                onClose={() => {
                  const copy = { ...filter };
                  const key = chip!.name as
                    | "arisanDate"
                    | "paymentDate"
                    | "paymentStatus";
                  delete copy[key];
                  setFilter(copy);
                }}
              />
            );
          })}
        </div>
        <DataTable
          columns={columns}
          fetchData={ArisanService.gets}
          getParams={getParams}
          alignment="top"
        />
      </div>
      <ArisanFilterModal
        open={openFilterModal}
        fetchPaymentStatusData={fetchArisanStatusPaymentData}
        defaultValue={filter}
        onClose={(val) => {
          setOpenFilterModal(false);
          if (val.confirmed) {
            setFilter(val.value);
          }
        }}
      />
      <ArisanDetailPrint ref={printRef} items={printItems} />
    </>
  );
};

export default ReportPage;
