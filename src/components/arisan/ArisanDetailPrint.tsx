import { Arisan } from "@/services/types/arisan";
import "../../assets/css/invoice-print.css";
import "../../assets/css/print.css";
import { forwardRef } from "react";
import HeaderPrint from "@/pages/print/HeaderPrint";
import clsx from "clsx";
import { capitalizeEachWord } from "@/utils/stringUtils";
interface IArisanDetailPrintProps {
  items: Arisan[];
}

const ArisanDetailPrint = forwardRef<HTMLDivElement, IArisanDetailPrintProps>(
  (props, ref) => {
    const { items } = props;
    // console.log("ArisanDetailPrint items: ", items);

    const columns = [
      "No",
      "Nama",
      "Tanggal Pengundian",
      "Tanggal Pembayaran",
      "Nominal Arisan",
      "Status",
    ];

    return (
      <div ref={ref} className="print-container">
        <style type="text/css" media="print">
          {"@page { margin: 24px; size: portrait; }"}
        </style>
        <HeaderPrint />
        <div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-base font-bold my-3">
              Bukti Pembayaran Arisan
            </h2>
          </div>
          <div className="rounded-full border">
            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead className="rounded-full">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="text-sm border border-gray-300 p-2 bg-hijauLightActive"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {capitalizeEachWord(item.name)}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.arisanDate
                        ? new Intl.DateTimeFormat("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(item.arisanDate))
                        : "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.paymentDate
                        ? new Intl.DateTimeFormat("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(item.paymentDate))
                        : "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {`Rp. ${item.arisanAmount.toLocaleString("id-ID")}`}
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
                        }
                      )}
                    >
                      {item.statusPayment.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

export default ArisanDetailPrint;
