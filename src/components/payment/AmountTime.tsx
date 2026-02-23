import React, { useState, useEffect } from "react";
// import LogoQRIS from "../assets/QRIS.svg";
import LogoQRIS from "../../assets/QRIS.svg";

interface AmountTimeProps {
  amount?: number;
  expiredTime?: string;
  isExpired?: boolean;
  payUrl?: string;
  billCode?: string;
  billKey?: string;
  vaNumber?: string;
  paymentCode?: string;
}

const AmountTime: React.FC<AmountTimeProps> = ({
  amount,
  expiredTime,
  isExpired = false,
  payUrl,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!expiredTime) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(expiredTime) - +new Date();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${days > 0 ? `${days} Hari ` : ""}${hours} Jam ${minutes} Menit ${seconds} Detik`;
      }
      return "Waktu pembayaran telah berakhir";
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredTime]);

  const formattedExpiredTime = expiredTime
    ? new Date(expiredTime).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <>
      <div className="flex flex-col items-center py-4 pt-8 px-24 space-y-8 phone:px-4">
        <div className="w-full bg-putihLight px-6 py-2 rounded-lg shadow-md">
          <div className="flex justify-between items-center align-middle border-b-2 border-black pb-6 phone:pb-4">
            <div className="text-xl phone:text-lg font-medium">
              Total Pembayaran
            </div>
            <div className="text-xl phone:text-lg font-medium text-merahNormal">
              {/* intl format (standarisasi)*/}
              {/* {new Intl.NumberFormat("id-ID").format(amount)} */}
              {`Rp. ${amount?.toLocaleString("id-ID")}`}
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="text-xl phone:text-sm font-medium phone:self-start">
              Pembayaran Dalam
            </div>
            <div className="text-end">
              <div
                className={`text-xl phone:text-xs text-end ${isExpired ? "text-hitamNormal" : "text-merahNormal"}`}
              >
                {timeLeft}
              </div>
              <div className="text-sm phone:text-xs text-gray-500">
                Jatuh Tempo {formattedExpiredTime}
              </div>
            </div>
          </div>
          {/* Payment method display */}
          <div className="w-full">
            {payUrl ? (
              <div className="w-full flex justify-start">
                <img
                  src={LogoQRIS}
                  alt="QRIS Logo"
                  className="w-28 my-8 phone:size-12 phone:my-4"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AmountTime;
