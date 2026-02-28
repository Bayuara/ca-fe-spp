import SppService from "@/services/sppServices";
import { useEffect, useState } from "react";
import "../../assets/css/invoice-print.css";
import "../../assets/css/print.css";
import clsx from "clsx";
import logoAlfamart from "../../assets/Logo_Alfamart.png";
import logoIndomaret from "../../assets/Logo_Indomaret.png";
import logoMandiri from "../../assets/bank-mandiri.svg";
import logoBNI from "../../assets/bank-bni.svg";
import logoBRI from "../../assets/bank-bri.svg";
import logoBCA from "../../assets/bank-bca.svg";
import logoQRIS from "../../assets/QRIS.svg";
import logoTunai from "../../assets/ic-MoneyWavy.svg";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { SppPrint } from "@/services/types/spp";
import { useLayout } from "@/presentation/components/hooks/useLayout";
import Button from "@/presentation/components/common/Button";
import StudentDataPrint from "./StudentDataPrint";
import HeaderPrint from "./HeaderPrint";
import { ROUTE_SPP } from "@/presentation/components/routes/routes";

const ShowInvoicePrint = () => {
  const { ids } = useParams();
  // const location = useLocation();
  // const transactionId = location.state?.transactionId;
  const [items, setItems] = useState<SppPrint[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(transactionId);

  const navigate = useNavigate();

  const { setHideLayout } = useLayout();

  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const columns = [
    "No",
    "No. Invoice",
    "Tenggat Pembayaran",
    "Tanggal Pembayaran",
    "Pembayaran",
    "Nominal Pembayaran",
    "Metode Pembayaran",
    "Status Pembayaran",
    "Tahun Ajaran",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const sppIds = ids?.split(",").map(Number) || [];
        const sppPromises = sppIds.map((id) => SppService.getById(id));
        const sppResponses = await Promise.all(sppPromises);
        const sppItems = sppResponses.map((response) => response.data);
        setItems(sppItems);
        // console.log("response sppItems: ", sppItems);
      } catch (err) {
        // console.error("Error fetching data:", err);
        toast.error("Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };
    if (ids) fetchData();
  }, [ids]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);

  //   }
  // },[]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       if (transactionId) {
  //         // Jika ada transactionId, gunakan getPaymentByTransactionId
  //         const response =
  //           await SppService.getPaymentByTransactionId(transactionId);
  //         setItems([response.data]); // Asumsikan respons hanya satu data
  //       } else if (ids) {
  //         // Jika transactionId tidak ada, baru gunakan ids untuk fetch data
  //         const sppIds = ids.split(",").map(Number);
  //         const sppPromises = sppIds.map((id) => SppService.getById(id));
  //         const sppResponses = await Promise.all(sppPromises);
  //         const sppItems = sppResponses.map((response) => response.data);
  //         setItems(sppItems);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //       toast.error("Terjadi kesalahan");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [ids, transactionId]);

  let totalSppAmount = 0;
  if (items) {
    items.forEach((item) => (totalSppAmount += item.sppAmount));
  }

  const handleClick = async () => {
    setIsLoading(false);

    if (items?.[0].statusPayment.name === "Menunggu Pembayaran") {
      try {
        navigate(`${ROUTE_SPP}/view-spp/${ids}/payment`, {
          state: {
            billcode: items?.[0].billCode,
            billKey: items?.[0].billKey,
            vaNumber: items?.[0].vaNumber,
            paymentCode: items?.[0].paymentCode,
            payUrl: items?.[0].payUrl,
            totalAmount: totalSppAmount,
            expiredTime: items?.[0].expiredTime,
            paymentType: items?.[0].paymentType,
          },
        });
      } catch {
        toast.error("Terjadi kesalahan");
      } finally {
        setIsLoading(true);
      }
    } else if (items?.[0].statusPayment.name === "Lunas") {
      toast.warning("Pembayaran anda SPP sudah Lunas");
    } else {
      toast.warning(
        "Anda belum melakukan Pembayaran, lakukan pembayaran terlebih dahulu",
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  // console.log("Items: ", items);

  // if (items && items.length > 0) {
  //   console.log(items[0]?.paymentCode);
  // }

  // console.log(
  //   " items?.[0].statusPayment.name: " + items?.[0].statusPayment.name
  // );

  return (
    <div className="p-6">
      {/* <div className="print-container"> */}
      <HeaderPrint />
      <div>
        <div className="flex flex-col items-center gap-2 phone:gap-0">
          <h2 className="phone:text-sm text-xl font-bold my-4 phone:my-2">
            Bukti Pembayaran SPP Siswa
          </h2>
          <p className="mb-4 phone:mb-2 phone:text-sm text-lg font-bold">
            {new Date().getMonth() + 1 <= 6
              ? `${new Date().getFullYear() - 1}/${new Date().getFullYear()}`
              : `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`}
          </p>
        </div>

        <StudentDataPrint />

        <h2 className="phone:text-sm text-xl font-bold border-b pb-4 phone:pb-2 border-gray-800 my-4 phone:mt-2">
          B. Data Pembayaran
        </h2>
        <div className="overflow-x-auto rounded-xl border border-hitamNormal">
          <table className="w-full border-collapse border border-gray-300 phone:text-xs">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 p-2 bg-hijauLightActive"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.invoiceSpp}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.paymentDeadline
                        ? new Date(item.paymentDeadline).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.settlementTime
                        ? new Date(item.settlementTime).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      SPP {monthNames[item.month - 1]}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">{`Rp. ${item.sppAmount.toLocaleString("id-ID")}`}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {clsx({
                        Mandiri: item.paymentType === "mandiri",
                        Indomaret: item.paymentType === "indomaret",
                        Alfamart: item.paymentType === "alfamart",
                        BNI: item.paymentType === "bni",
                        BRI: item.paymentType === "bri",
                        BCA: item.paymentType === "bca",
                        QRIS: item.paymentType === "qris",
                        Tunai: item.paymentType === "tunai",
                        "-": !item.paymentType,
                      })}
                    </td>
                    <td
                      className={clsx(
                        "border border-gray-300 p-2 text-center font-bold",
                        {
                          "text-hijauNormal":
                            item.statusPayment.name === "Lunas",
                          "text-merahNormal":
                            item.statusPayment.name === "Belum Bayar",
                          "text-kuningNormal":
                            item.statusPayment.name === "Menunggu Pembayaran",
                        },
                      )}
                    >
                      {item.statusPayment.name}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.year && item.month <= 6
                        ? `${item.year - 1}/${item.year}`
                        : `${item.year}/${item.year + 1}`}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    Data pembayaran tidak tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {items?.[0].statusPayment.name === "Lunas" ? null : (
          <>
            <h2 className="text-xl phone:text-xs font-bold border-b pb-4 border-gray-800 mt-8 mb-4">
              C. Detail Pembayaran
            </h2>
            <div className="flex justify-between items-center align-middle">
              <div className="text-xl phone:text-xs font-medium">
                Total Pembayaran
              </div>
              <div className="text-2xl phone:text-xs font-medium text-merahNormal">
                {items
                  ? `Rp. ${totalSppAmount.toLocaleString("id-ID")}`
                  : "N/A"}
              </div>
            </div>

            {/* Render logos and payment details based on payment method */}
            {items && items[0]?.paymentCode && items.length > 0 && (
              <>
                <div className="flex justify-between items-center my-4">
                  <img
                    src={clsx({
                      [logoAlfamart]: items[0]?.paymentType === "alfamart",
                      [logoIndomaret]: items[0]?.paymentType === "indomaret",
                    })}
                    alt="Merchant Logo"
                    className="h-12"
                  />
                  <div>
                    <p className="text-xl phone:text-xs font-bold">
                      Kode: {items[0]?.paymentCode}
                    </p>
                    {items[0]?.paymentType === "indomaret" && (
                      <p className="">Merchant Id: {items[0]?.merchantId}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {items && items[0]?.paymentType === "tunai" && items.length > 0 && (
              <>
                <div className="flex justify-between items-center my-4">
                  <img src={logoTunai} alt="Tunai" className="h-12" />
                  <p className="text-xl phone:text-xs font-bold">
                    Transfer Tunai Ke Sekolah
                  </p>
                </div>
              </>
            )}

            {items && items[0]?.vaNumber && items.length > 0 && (
              <>
                <div className="flex justify-between items-center my-4">
                  <img
                    src={clsx({
                      [logoBNI]: items[0]?.paymentType === "bni",
                      [logoBRI]: items[0]?.paymentType === "bri",
                      [logoBCA]: items[0]?.paymentType === "bca",
                    })}
                    alt="Bank"
                    className="phone:size-12 size-20"
                  />
                  <p className="text-xl phone:text-xs font-bold">
                    {items[0]?.vaNumber ?? "N/A"}
                  </p>
                </div>
              </>
            )}

            {items &&
              items[0]?.billCode &&
              items[0]?.billKey &&
              items.length > 0 && (
                <>
                  <div className="flex justify-between items-center my-4">
                    <img src={logoMandiri} alt="Mandiri" className="h-12" />
                    <div>
                      <div className="text-xl phone:text-xs">
                        <span className="font-bold">Bill Code: </span>
                        <span className="text-merahNormal">
                          {items[0]?.billCode ?? "N/A"}
                        </span>
                      </div>
                      <div className="text-xl mt-2 phone:text-xs">
                        <span className="font-bold">Bill Key: </span>
                        <span className="text-merahNormal">
                          {items[0]?.billKey ?? "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

            {items && items[0]?.payUrl && items.length > 0 && (
              <div>
                <div className="flex justify-between items-center my-4">
                  <img src={logoQRIS} alt="QRIS" className="h-12" />
                  <div className="flex justify-center">
                    <img
                      src={items[0]?.payUrl}
                      alt="QR Code"
                      className="size-64"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <p className="text-right phone:text-xs">
          {new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date())}
        </p>
      </div>
      <Button
        className={clsx("mt-10 mb-6 phone:mt-4 phone:mb-2", {
          "!bg-gray-400 hover:bg-gray-300 text-gray-200 hover:text-gray-100":
            items?.[0].statusPayment.name === "Belum Bayar" ||
            items?.[0].statusPayment.name === "Lunas",
        })}
        block
        onClick={handleClick}
      >
        Detail pembayaran
      </Button>
      <Button
        variant="outline"
        className="mb-10"
        block
        onClick={() => navigate("/spp")}
      >
        Kembali
      </Button>
      {/* </div> */}
    </div>
  );
};

export default ShowInvoicePrint;
