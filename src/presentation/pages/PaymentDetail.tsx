import React, { useEffect, useState } from "react";
import Banner from "../components/layout/Banner";
import Button from "../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import SppService from "@/services/sppServices";
import { capitalizeEachWord } from "@/utils/stringUtils";
import { useAuth } from "@/presentation/components/hooks/useAuth";
import { FiRotateCw } from "react-icons/fi";
import { toast } from "sonner";

interface Invoice {
  amount: number;
  invoice: string;
  status: string;
  month: string;
}

interface Data {
  nisn: string | undefined;
  name: string;
  kelas: string;
  invoices: Invoice[];
}

const PaymentDetail: React.FC = () => {
  const { ids } = useParams<{ ids: string }>();
  const [data, setData] = useState<Data | null>(null);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const sppIds = ids?.split(",").map(Number) || [];
        const sppPromises = sppIds.map((id) => SppService.getById(id));
        const sppResponses = await Promise.all(sppPromises);
        // console.log("response sppResponses: ", sppResponses);

        const invoices = sppResponses.map((response) => {
          const sppData = response.data;
          // console.log("response sppData: ", sppData);
          return {
            amount: sppData.sppAmount,
            invoice: sppData.invoiceSpp,
            status: sppData.statusPayment.name,
            month: new Date(sppData.year, sppData.month - 1).toLocaleString(
              "default",
              { month: "long" },
            ),
          };
        });

        setData({
          nisn: user?.userDetail.nisn,
          name: capitalizeEachWord(user?.name || ""),
          kelas: user?.userDetail.class.name.toUpperCase() ?? "",
          invoices: invoices,
        });
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching data:", error);
        toast.error("Terjadi kesalahan");
      }
    };

    if (ids && user) {
      fetchData();
    }
  }, [ids, user]);

  // console.log("sppData: ", data);

  const totalAmount =
    data?.invoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0) ||
    0;

  const allInvoices =
    data?.invoices.map((inv) => <div key={inv.invoice}>{inv.invoice}</div>) ||
    null;

  const fields = [
    { label: "NISN", value: data?.nisn },
    { label: "Nama Lengkap", value: data?.name },
    { label: "Kelas", value: data?.kelas },
    {
      label: "Nominal Wajib Bayar",
      value: `Rp ${totalAmount.toLocaleString("id-ID")}`,
    },
    { label: "No.Invoice", value: allInvoices },
    {
      label: "Status Bayar",
      value: data?.invoices[0]?.status,
      className: clsx({
        "text-hijauNormal": data?.invoices[0]?.status === "Lunas",
        "text-kuningNormal":
          data?.invoices[0]?.status === "Menunggu Pembayaran",
        "text-merahNormal": data?.invoices[0]?.status == "Belum Bayar",
      }),
    },
  ];

  return (
    <div className="min-h-screen bg-putihNormal px-12 phone:px-6">
      <Banner />
      <div className="flex flex-col items-center py-10">
        <div className="bg-putihLightActive rounded-lg shadow-lg p-8 w-full">
          <h1 className="laptop:text-xl tablet:text-lg text-sm font-bold mb-6 text-center">
            Detail Pembayaran SPP
          </h1>
          {loading ? (
            <div className="flex justify-center items-center gap-4">
              <FiRotateCw className="animate-spin-clockwise" /> Loading...
            </div>
          ) : null}
          {data && !loading ? (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={index}>
                  <div className="block laptop:text-base tablet:text-sm text-sm font-medium text-hitamNormal">
                    {field.label}
                  </div>
                  <div
                    className={clsx(
                      "mt-3 block w-full py-3 px-6 phone:px-3 phone:py-1.5 rounded-xl shadow-sm text-sm tablet:text-sm laptop:text-base border-2 border-hitamNormal",
                      field.className,
                    )}
                  >
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col mt-8 gap-2 w-full">
          <Button
            onClick={() => {
              setIsLoading(false);
              navigate("metode");
            }}
            variant="default"
            block
            isLoading={isLoading}
            disabled={isLoading}
            className="text-sm py-1 laptop:text-lg laptop:py-2"
          >
            {!user?.customer.isPaymentCashless
              ? "Lihat Informasi Pembayaran"
              : "Pilih Metode Pembayaran"}
          </Button>
          <Button
            onClick={() => navigate("/spp")}
            variant="outline"
            block
            disabled={isLoading}
            className="text-sm py-1 laptop:text-lg"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
