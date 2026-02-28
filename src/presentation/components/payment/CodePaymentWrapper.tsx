import React, { useState } from "react";
import clipboard from "../../assets/Clipboard.svg";
import SuccessModals from "../common/SuccessModals";
import clsx from "clsx";
import LogoMandiri from "../../assets/bank-mandiri.svg";
import LogoBNI from "../../assets/bank-bni.svg";
import LogoBRI from "../../assets/bank-bri.svg";
import LogoBCA from "../../assets/bank-bca.svg";
import LogoAlfamart from "../../assets/Logo_Alfamart.png";
import LogoIndomaret from "../../assets/Logo_Indomaret.png";
import { toast } from "sonner";

interface CodePaymentWrapperProps {
  billCode?: string | null;
  billKey?: string | null;
  vaNumber?: string | null;
  paymentCode?: string | null;
  payUrl?: string | null;
  paymentType: string | null;
  merchantId: string | null;
}

const logos = {
  mandiri: LogoMandiri,
  bni: LogoBNI,
  bri: LogoBRI,
  bca: LogoBCA,
  alfamart: LogoAlfamart,
  indomaret: LogoIndomaret,
};

const CodePaymentWrapper: React.FC<CodePaymentWrapperProps> = ({
  billCode,
  billKey,
  vaNumber,
  paymentCode,
  payUrl,
  paymentType,
  merchantId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        handleOpenModal();
      },
      (err) => {
        toast.error("Gagal menyalin ke clipboard: ", err);
      }
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-putihLight p-4 rounded-lg shadow-md">
      <div
        className={clsx(
          "text-xl phone:text-lg font-bold mb-2 border-b-2 py-2 border-black",
          {
            Mandiri: paymentType === "mandiri",
            Indomart: paymentType === "indomaret",
            Alfamart: paymentType === "alfamart",
            BNI: paymentType === "bni",
            BRI: paymentType === "bri",
            BCA: paymentType === "bca",
            QRIS: paymentType === "qris",
          }
        )}
      >
        <img
          src={
            paymentType ? logos[paymentType as keyof typeof logos] : undefined
          }
          alt={paymentType || ""}
          className="inline-block mr-2 size-16 phone:size-10 object-scale-down"
        />{" "}
        {paymentType === "alfamart"
          ? "Alfamart / Alfamidi"
          : paymentType === "indomaret"
            ? "Indomaret"
            : paymentType
              ? paymentType.toUpperCase()
              : "Informasi Pembayaran"}
        {/* {paymentType ? paymentType.toUpperCase() : "Informasi Pembayaran"} */}
      </div>

      {/* Conditionally render based on which payment info is available */}
      {vaNumber && (
        <div>
          <div className="text-sm mb-2">Nomor Virtual Account</div>
          <div className="flex justify-between items-center">
            <div className="text-sm laptop:text-lg font-bold text-merahNormal">
              {vaNumber}
            </div>
            <button
              className="bg-transparent text-hijauNormal px-4 py-2 rounded-md flex gap-2 items-center"
              onClick={() => copyToClipboard(vaNumber)}
            >
              <img
                src={clipboard}
                alt="Salin"
                className="size-6 phone:size-4"
              />
              <span className="text-sm">Salin</span>
            </button>
          </div>
        </div>
      )}

      {billCode && billKey && (
        <div>
          <div className="text-lg mb-2">Pembayaran Bank Mandiri</div>
          <div className="flex justify-between items-center">
            <div className="text-xl phone:text-sm">
              <span className="font-bold">Bill Code: </span>
              <span className="text-merahNormal">{billCode}</span>
            </div>
            <button
              className="bg-transparent text-hijauNormal px-4 py-2 rounded-md flex gap-2 items-center"
              onClick={() => copyToClipboard(`${billCode}`)}
            >
              <img src={clipboard} alt="Salin" className="w-6 h-6" />
              <span className="text-xl phone:text-sm">Salin</span>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-xl phone:text-sm">
              <span className="font-bold">Bill Key: </span>
              <span className="text-merahNormal">{billKey}</span>
            </div>
            <button
              className="bg-transparent text-hijauNormal px-4 py-2 rounded-md flex gap-2 items-center"
              onClick={() => copyToClipboard(`${billKey}`)}
            >
              <img src={clipboard} alt="Salin" className="w-6 h-6" />
              <span className="text-xl phone:text-sm">Salin</span>
            </button>
          </div>
        </div>
      )}

      {paymentCode && (
        <>
          <div className="text-lg mb-2">Kode Pembayaran</div>
          <div className="flex justify-between items-center">
            <div className="text-xl phone:text-sm font-bold text-merahNormal">
              {paymentCode}
            </div>
            <button
              className="bg-transparent text-hijauNormal px-4 py-2 rounded-md flex gap-2 items-center"
              onClick={() => copyToClipboard(paymentCode)}
            >
              <img src={clipboard} alt="Salin" className="w-6 h-6" />
              <span className="text-xl phone:text-sm">Salin</span>
            </button>
          </div>
          {merchantId && paymentType === "indomaret" && (
            <>
              <div className="mt-2">
                <span className="font-normal">Merchant ID:</span>
                <div className="flex justify-between items-center">
                  <div className="text-xl phone:text-sm font-bold text-merahNormal">
                    {merchantId}
                  </div>
                  <button
                    className="bg-transparent text-hijauNormal px-4 py-2 rounded-md flex gap-2 items-center"
                    onClick={() => copyToClipboard(merchantId)}
                  >
                    <img src={clipboard} alt="Salin" className="w-6 h-6" />
                    <span className="text-xl phone:text-sm">Salin</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {payUrl && (
        <div>
          <div className="text-lg mb-2">Tautan Pembayaran</div>
          <div className="flex justify-between items-center">
            <a
              href={payUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl phone:text-sm font-bold text-hijauNormal underline"
            >
              Buka Tautan
            </a>
          </div>
        </div>
      )}

      <SuccessModals
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closable
        description="Informasi berhasil disalin!"
        withButton
      />
    </div>
  );
};

export default CodePaymentWrapper;
