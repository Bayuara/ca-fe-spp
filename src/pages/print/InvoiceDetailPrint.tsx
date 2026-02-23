import { SppPrint } from "@/services/types/spp";
import { forwardRef } from "react";
import "../../assets/css/invoice-print.css";
import "../../assets/css/print.css";
import clsx from "clsx";
import logoIndomaret from "../../assets/Logo_Indomaret.png";
import logoMandiri from "../../assets/bank-mandiri.svg";
import logoBNI from "../../assets/bank-bni.svg";
import logoBRI from "../../assets/bank-bri.svg";
import logoBCA from "../../assets/bank-bca.svg";
import logoQRIS from "../../assets/QRIS.svg";
import logoTunai from "../../assets/ic-MoneyWavy.svg";
import logoAlfamart from "../../assets/Logo_Alfamart.png";
import HeaderPrint from "./HeaderPrint";
import { capitalizeFirstLetter } from "@/utils/stringUtils";
import StudentDataPrint from "./StudentDataPrint";

interface IInvoiceDetailPrintProps {
  items: SppPrint[];
}

const InvoiceDetailPrint = forwardRef<HTMLDivElement, IInvoiceDetailPrintProps>(
  (props, ref) => {
    const { items } = props;
    // console.log("items: ", items);

    const flattenItems = items.flatMap((item) => {
      const ids = Array.isArray(item.id) ? item.id : [item.id];
      const months = Array.isArray(item.month) ? item.month : [item.month];
      const paymentDeadlines = Array.isArray(item.paymentDeadline)
        ? item.paymentDeadline
        : [item.paymentDeadline];
      const sppAmounts = Array.isArray(item.sppAmount)
        ? item.sppAmount
        : [item.sppAmount];
      const invoiceSpps = Array.isArray(item.invoiceSpp)
        ? item.invoiceSpp
        : [item.invoiceSpp];
      const settlementTimes = Array.isArray(item.settlementTime)
        ? item.settlementTime
        : [item.settlementTime];
      const totalAmounts = item.totalAmount;

      return ids.map((id, index) => ({
        id: id,
        invoiceSpp: invoiceSpps[index] || invoiceSpps[0],
        month: months[index] || months[0],
        year: item.year,
        sppAmount: sppAmounts[index] || sppAmounts[0],
        // paymentDeadline: item.paymentDeadline,
        paymentDeadline: paymentDeadlines[index] || paymentDeadlines[0],
        settlementTime: settlementTimes[index],
        paymentType: item.paymentType,
        statusPayment: item.statusPayment,
        totalAmount: totalAmounts,
      }));
    });

    // console.log("flattened items: ", flattenItems);

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

    return (
      <div ref={ref} className="print-container">
        <style type="text/css" media="print">
          {"@page { margin: 24px; size: portrait; }"}
        </style>
        <HeaderPrint />
        <div className="mt-4">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-bold mb-2">
              Bukti Pembayaran SPP Siswa
            </h2>
            <p className="mb-4 text-lg font-bold">
              {/* {new Date().getMonth() + 1 <= 6
                ? `${new Date().getFullYear() - 1}/${new Date().getFullYear()}`
                : `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`} */}
              {new Intl.DateTimeFormat("id-ID", {
                month: "long",
                year: "numeric",
              }).format(new Date())}
            </p>
          </div>

          <StudentDataPrint />

          <h2 className="text-xl font-bold border-b my-4 pb-4 border-gray-800">
            B. Data Pembayaran
          </h2>

          <table className="w-full border-collapse border border-gray-300 mb-4">
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
              {flattenItems && flattenItems.length > 0 ? (
                flattenItems.map((item, index) => (
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
                            }
                          )
                        : "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {/* {item.settlementTime ?? "-"} */}
                      {item.settlementTime
                        ? new Date(item.settlementTime).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      SPP {monthNames[item.month - 1]}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {`Rp. ${item.sppAmount.toLocaleString("id-ID")}`}
                    </td>
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
                        "border border-gray-300 p-2 text-center font-extrabold",
                        {
                          "text-hijauNormal":
                            item.statusPayment.name === "Lunas",
                          "text-merahNormal":
                            item.statusPayment.name === "Belum Bayar",
                          "text-kuningNormal":
                            item.statusPayment.name === "Menunggu Pembayaran",
                        }
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
                  <td colSpan={columns.length} className="text-center my-3">
                    Data pembayaran tidak tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {items[0]?.statusPayment.name === "Lunas" ? null : (
            <>
              <h2 className="text-xl font-bold border-b my-4 pb-4 border-gray-800">
                C. Detail Pembayaran
              </h2>
              <div className="flex justify-between items-center align-middle">
                <div className="text-xl font-medium">Total Pembayaran</div>
                <div className="text-2xl font-medium text-merahNormal">
                  {`Rp. ${(items[0]?.totalAmount || items[0]?.sppAmount || 0).toLocaleString("id-ID")}`}
                </div>
              </div>

              {/* Render logo dan detail pembayaran berdasarkan metode pembayaran */}
              {items[0]?.vaNumber && (
                <div>
                  <div className="flex justify-between items-center my-4">
                    <img
                      src={clsx({
                        [logoBNI]: items[0]?.paymentType === "bni",
                        [logoBRI]: items[0]?.paymentType === "bri",
                        [logoBCA]: items[0]?.paymentType === "bca",
                      })}
                      alt="Bank"
                      className="h-12"
                    />
                    <p className="text-xl font-bold">{items[0]?.vaNumber}</p>
                  </div>
                </div>
              )}

              {items[0]?.paymentType === "tunai" && (
                <div>
                  <div className="flex justify-between items-center my-4">
                    <img src={logoTunai} alt="Tunai" className="h-12" />
                    <p className="text-2xl font-bold">
                      {capitalizeFirstLetter(items[0].paymentType)}
                    </p>
                  </div>
                </div>
              )}

              {items[0]?.billCode && items[0]?.billKey && (
                <div>
                  <div className="flex justify-between items-center my-4">
                    <img src={logoMandiri} alt="Mandiri" className="h-12" />
                    <div>
                      <div className="text-xl">
                        <span className="font-bold">Bill Code: </span>
                        <span className="text-merahNormal">
                          {items[0]?.billCode}
                        </span>
                      </div>
                      <div className="text-xl mt-2">
                        <span className="font-bold">Bill Key: </span>
                        <span className="text-merahNormal">
                          {items[0]?.billKey}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {items[0]?.paymentCode && (
                <>
                  {/* {console.log("Rendering Payment Code")} */}
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
                      <p className="text-xl font-bold">
                        Kode: {items[0]?.paymentCode}
                      </p>
                      {items[0]?.paymentType === "indomaret" && (
                        <p className="">Merchant Id: {items[0]?.merchantId}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {items[0]?.payUrl && (
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
                    {/* <p className="text-sm text-gray-600 mt-2 break-all">
                      {items[0]?.payUrl}
                    </p> */}
                  </div>
                </div>
              )}
            </>
          )}

          <p className="text-right">
            {new Intl.DateTimeFormat("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date())}
          </p>
        </div>
      </div>
    );
  }
);

export default InvoiceDetailPrint;
