import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
} from "react";
import { useNavigate } from "react-router-dom";
import { FaRegFile } from "react-icons/fa";
import { PiHourglassMediumLight } from "react-icons/pi";
import { PiBoxArrowDown } from "react-icons/pi";
import DataTable from "@/presentation/components/common/table/DataTable";
import Button from "../components/common/Button";
import { toast } from "sonner";
import clsx from "clsx";
import { SppPrint } from "@/services/types/spp";
import { useReactToPrint } from "react-to-print";
import InvoiceDetailPrint from "./print/InvoiceDetailPrint";
import useSppDatable from "@/presentation/components/spp/useSppDatable";
import useWaitingSppDatable from "@/presentation/components/spp/useWaitingSppDataTable";
import ConfirmationModals from "@/presentation/components/common/ConfirmationModals";
import { ROUTE_SPP } from "@/presentation/components/routes/routes";
import { useQuery } from "@tanstack/react-query";
import { useGets } from "../hooks/spp/useGets";
import { useGetAllWaitingSpp } from "../hooks/spp/useGetAllWaitingSpp";
import { useCancelPayment } from "../hooks/spp/useCancelPayment";

const Banner = React.lazy(() => import("../components/layout/Banner"));

const SPPPage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const { columns, selectedItems } = useSppDatable({ printRef });
  const {
    columnsWaiting,
    selectedWaitingItems,
    // selectedTransactionId,
    isConfirmationModal,
    setIsConfirmationModal,
  } = useWaitingSppDatable({ printRef });

  const [filter, setFilter] = useState<string>("all");
  const [hasPendingPayments, setHasPendingPayments] = useState<boolean>(false);
  const [isAllPaid, setIsAllPaid] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  const [printItems, setPrintItems] = useState<SppPrint[]>([]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const { gets } = useGets();
  const { getAllWaitingSpp } = useGetAllWaitingSpp();
  const { cancelPayment } = useCancelPayment();

  const { data, isLoading } = useQuery({
    queryKey: ["spp", filter],
    queryFn: () => (filter === "all" ? gets() : getAllWaitingSpp()),
    // select: (response) => response.data,
    // refetchOnWindowFocus: true,
  });

  const handleDownloadClick = async () => {
    if (filter === "all") {
      setPrintItems(await gets());
      // console.log("selectedItems: ", printItems);
      setTimeout(handlePrint, 1000);
    } else {
      setPrintItems(await getAllWaitingSpp());
      // console.log("selectedWaitingItems: ", printItems);
      setTimeout(handlePrint, 1000);
    }
  };

  // console.log("selectedItems: " + {selectedItems});
  // console.log("selectedWaitingItems: " + {selectedWaitingItems});

  // buat download (print) satuan
  useEffect(() => {
    if (filter === "all") {
      setPrintItems(
        Array.isArray(selectedItems) // Jika selectedItems adalah array, maka setPrintItems diisi selectedItems apa adanya.
          ? selectedItems
          : selectedItems //(disini selectedItems bukan array) Jika selectedItems bukan array, maka dicek dulu null atau tidak. selectedItem akan dijadikan array, kalau null dia akan dijadikan array kosong
            ? [selectedItems]
            : [],
      );
    } else {
      setPrintItems(
        Array.isArray(selectedWaitingItems)
          ? selectedWaitingItems
          : selectedWaitingItems
            ? [selectedWaitingItems]
            : [],
      );
    }
  }, [filter, selectedItems, selectedWaitingItems]);

  const handleSelectionChange = useCallback((selectedIds: number[]) => {
    setSelectedIds(selectedIds);
  }, []);

  const handleBayarSekarangClick = () => {
    // setIsLoading(true);

    const sppBelumBayar = data?.filter(
      (spp) => spp.statusPayment.name === "Belum Bayar",
    );

    if (hasPendingPayments) {
      toast.info(
        "Pilih SPP terlebih dahulu atau lunasi SPP yang menunggu pembayaran",
      );
      // setIsLoading(false);
    } else if (selectedIds.length === 0) {
      const firstUnpaidSPP = sppBelumBayar![0];
      navigate(`${firstUnpaidSPP.id}`);
    } else {
      navigate(`${selectedIds.join(",")}`);
      // setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    // setIsLoading(true);

    console.log("refetch sebelum try: ", refetch);

    try {
      const fetchTransactionId = (await getAllWaitingSpp())[0].transactionId;
      const response = await cancelPayment(fetchTransactionId!);
      toast.success(response?.message);
      setIsConfirmationModal(false);
      // Fetch fresh data after cancellation
      // const newData = await fetchAllSpp();
      // setData(newData);
    } catch (error) {
      toast.error("Terjadi kesalahan saat membatalkan transaksi: " + error);
    } finally {
      // setIsLoading(false);
      // setHasPendingPayments(false);
      setRefetch(!refetch);
    }

    console.log("refetch setelah try-catch: ", refetch);
  };

  useEffect(() => {
    console.log("refetch telah berubah: " + refetch);
    console.log("hasPendingPayments berubah: " + hasPendingPayments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  useEffect(() => {
    // console.log("data berubah coyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");

    const hasPendingPayments = data?.some(
      (item) => item.statusPayment.name === "Menunggu Pembayaran",
    );
    const allPaidCheck = data?.every(
      (item) => item.statusPayment.name === "Lunas",
    );
    setHasPendingPayments(hasPendingPayments ?? false);
    setIsAllPaid(allPaidCheck ?? false);
    // console.log("hasPendingPayments: " + hasPendingPayments);
  }, [data]);

  return (
    <div className="min-h-full bg-putihNormal">
      <div className="flex flex-col p-8 laptop:px-12 pt-0">
        <Suspense fallback={<p>Banner loading...</p>}>
          <Banner />
        </Suspense>
        <div className="my-4 flex justify-between items-center">
          <div className="laptop:space-x-6 flex items-center phone:flex-col tablet:flex-col gap-2.5 my-2">
            <Button
              block
              className="flex items-center phone:text-xs phone:font-normal tablet:text-sm tablet:font-normal laptop:min-w-fit"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => {
                setFilter("all");
                setRefetch(!refetch);
              }}
              iconPrefix={<FaRegFile className="size-6 phone:size-4" />}
            >
              <span>Semua Pembayaran SPP</span>
            </Button>
            <Button
              block
              className="flex items-center phone:text-xs phone:font-normal tablet:text-sm tablet:font-normal"
              variant={filter === "Menunggu Pembayaran" ? "default" : "outline"}
              onClick={() => {
                setFilter("Menunggu Pembayaran");
                setRefetch(!refetch);
              }}
              iconPrefix={
                <PiHourglassMediumLight className="size-6 phone:size-4" />
              }
            >
              <span>Menunggu Pembayaran</span>
            </Button>
          </div>
          <div className="self-start mt-2">
            {filter === "all" && (
              <Button
                className="bg-hijauNormal text-white rounded-lg flex items-center phone:text-xs"
                onClick={handleDownloadClick}
                // disabled={filter === "Menunggu Pembayaran"}
                iconPrefix={<PiBoxArrowDown className="size-4 laptop:size-6" />}
              >
                <span>Download</span>
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-center w-full mt-5">
          {/* {filter === "Menunggu Pembayaran" && (
            <DataTable
              columns={columnsWaiting}
              fetchData={getAllWaitingSpp()}
              getRowId={(val) => val.id}
              refetch={refetch}
              onSelectionChange={handleSelectionChange}
              onRowClick={(val) => navigate(`${ROUTE_SPP}/view-spp/${val.id}`)}
            />
          )}
          {filter === "all" && (
            <DataTable
              columns={columns}
              // fetchData={SppService.getAllSppByMonth}
              fetchData={gets()}
              // fetchData={fetchAllSpp}
              getRowId={(val) => val.id}
              refetch={refetch}
              onSelectionChange={handleSelectionChange}
            />
          )} */}
          {/* <DataTable
            columns={filter === "all" ? columns : columnsWaiting}
            fetchData={async () => {
              const response =
                filter === "all" ? await gets() : await getAllWaitingSpp();
              return {
                data: response || [],
                page: { totalItems: response?.length || 0 },
              };
            }}
            getRowId={(val) => val.id}
            refetch={refetch}
            onSelectionChange={handleSelectionChange}
            onRowClick={(val) => navigate(`${ROUTE_SPP}/view-spp/${val.id}`)}
          /> */}
          <DataTable
            key={filter}
            columns={filter === "all" ? columns : columnsWaiting}
            fetchData={async () => {
              const response =
                filter === "all" ? await gets() : await getAllWaitingSpp();
              return {
                data: response || [],
                page: { totalItems: response?.length || 0 },
              };
            }}
            getRowId={(val) => val.id}
            refetch={refetch}
            onSelectionChange={handleSelectionChange}
            onRowClick={(val) => {
              if (filter !== "all") {
                navigate(`${ROUTE_SPP}/view-spp/${val.id}`);
              }
            }}
          />
        </div>
        {filter !== "Menunggu Pembayaran" && (
          <div className="my-8">
            <Button
              onClick={handleBayarSekarangClick}
              block
              isLoading={isLoading}
              disabled={hasPendingPayments || isAllPaid || isLoading}
              className={clsx("text-white", {
                "bg-gray-400 hover:bg-gray-500":
                  selectedIds.length === 0 || hasPendingPayments,
              })}
            >
              Bayar Sekarang
            </Button>
          </div>
        )}
        {filter === "Menunggu Pembayaran" && (
          <div className="my-8">
            <Button
              onClick={() => setIsConfirmationModal(true)}
              block
              variant="danger"
              isLoading={isLoading}
              disabled={hasPendingPayments === false || isLoading}
              // className={clsx("text-white", {
              //   "bg-red-400 hover:bg-red-500":
              //     selectedTransactionId !== undefined,
              // })}
            >
              Batalkan Pembayaran
            </Button>
          </div>
        )}
      </div>
      <ConfirmationModals
        isOpen={isConfirmationModal}
        isLoading={isLoading}
        description="Apakah anda yakin ingin membatalkan pembayaran SPP?"
        closable
        imageModals={<img src="/ic-X.svg" alt="X" />}
        onClose={(val) => {
          if (val.confirmed) {
            handleCancel();
            setHasPendingPayments(false);
          } else {
            setIsConfirmationModal(false);
          }
          // setHasPendingPayments(false);
        }}
      />
      <InvoiceDetailPrint ref={printRef} items={printItems} />
    </div>
  );
};

export default SPPPage;
