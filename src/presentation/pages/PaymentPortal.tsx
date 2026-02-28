import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import AmountTime from "@/presentation/components/payment/AmountTime";
import { useLayout } from "@/presentation/components/hooks/useLayout";
import AccordionDescription from "@/presentation/components/payment/AccordionDescription";
import CodePaymentWrapper from "@/presentation/components/payment/CodePaymentWrapper";
import { ROUTE_SPP } from "@/presentation/components/routes/routes";

const PaymentPortal: React.FC = () => {
  const { state } = useLocation();
  const { ids } = useParams<{ ids: string }>();
  const navigate = useNavigate();
  const {
    totalAmount,
    billCode,
    billKey,
    vaNumber,
    paymentCode,
    payUrl,
    expiredTime,
    paymentType,
    merchantId,
  } = state;

  // useEffect(() => {
  //   console.log("Payment Portal State:", state);
  // }, [state]);

  // console.log("ID bray: ", ids);
  // console.log("totalAmount: ", totalAmount);
  // console.log("expiredTime: ", expiredTime);
  // console.log("paymentType: ", paymentType);

  const mBankingInstructions = [
    "Buka situs internet banking bank anda dan login.",
    <>
      <p>
        Pilih menu <strong>"Pembayaran"</strong>
      </p>
    </>,
    <>
      <p>
        Pilih <strong>“Virtual Account”</strong> atau <strong>“VA”</strong>, dan
        masukkan nomor Virtual Account {vaNumber}.
      </p>
    </>,
    <>
      <p>
        Masukkan nomor Virtual Account{" "}
        <span className="text-merahNormal font-bold">{vaNumber}</span>
      </p>
    </>,
    <>
      <p>
        Masukkan jumlah pembayaran anda{" "}
        <span className="text-merahNormal font-bold">
          Rp {totalAmount.toLocaleString("id-ID")}
        </span>
        , konfirmasi detail, masukkan kode OTP, dan selesaikan pembayaran.
      </p>
    </>,
  ];

  const iBankingInstructions = [
    "Buka situs internet banking bank anda dan login.",
    <>
      <p>
        Pilih menu <strong>"Pembayaran"</strong>
      </p>
    </>,
    <>
      <p>
        Pilih <strong>“Virtual Account”</strong> atau <strong>“VA”</strong>, dan
        masukkan nomor Virtual Account {vaNumber}.
      </p>
    </>,
    <>
      <p>
        Masukkan nomor Virtual Account{" "}
        <span className="text-merahNormal font-bold">{vaNumber}</span>
      </p>
    </>,
    <>
      <p>
        Masukkan jumlah pembayaran anda{" "}
        <span className="text-merahNormal font-bold">
          Rp {totalAmount.toLocaleString("id-ID")}
        </span>
        , konfirmasi detail, masukkan kode OTP, dan selesaikan pembayaran.
      </p>
    </>,
  ];

  const AtmInstructions = [
    "Masukkan kartu ATM dan masukkan PIN.",
    <>
      Pilih "<strong>Virtual Account</strong>" atau "
      <strong>Virtual Account</strong>", dan masukkan nomor Virtual Account{" "}
      {vaNumber}.
    </>,
    <>
      <p>
        Masukkan jumlah pembayaran anda{" "}
        <span className="text-merahNormal font-bold">
          Rp {totalAmount.toLocaleString("id-ID")}
        </span>
        , konfirmasi detail, dan selesaikan pembayaran.
      </p>
    </>,
  ];

  const mBankingMandiri = [
    "Buka aplikasi M-Banking Mandiri.",
    <>
      Pilih menu “<strong>Pembayaran</strong>”.
    </>,
    <>
      Cari <em>Midtrans</em> dikolom <em>search</em> dengan mengetik
      <em>Midtrans</em>
      atau dengan kode "<strong>70012</strong>".
    </>,
    <>
      Masukkan nomor Virtual Account{" "}
      <span className="text-merahNormal font-bold">{vaNumber}</span>.
    </>,
    <>
      Lakukan pembayaran anda sejumlah{" "}
      <span className="text-merahNormal font-bold">
        Rp {totalAmount.toLocaleString("id-ID")}
      </span>
      , konfirmasi detail, masukkan kode PIN, dan selesaikan pembayaran.
    </>,
  ];

  const AtmMandiri = [
    "Masukkan kartu ATM dan masukkan PIN.",
    <>
      Pilih menu <strong>"Bayar/Beli"</strong>.
    </>,
    <>
      Pilih <strong>"Lainnya"</strong>, lalu <strong>"Lainnya"</strong>, Lalu
      <strong>"Multipayment"</strong>.
    </>,
    `Jika muncul masukkan kode jasa layanan pembayaran, masukkan kode Midtrans, yaitu "70012".`,
    `Masukkan nomor Virtual Account ${vaNumber}.`,
    `Lakukan pembayaran anda sejumlah Rp ${totalAmount.toLocaleString("id-ID")}, konfirmasi detail, masukkan kode PIN, dan selesaikan pembayaran.`,
  ];

  const QrisInstruction = [
    <>
      Pembayaran QRIS dapat digunakan untuk website <strong>SPPKu</strong>.
    </>,
    <>
      tekan tombol <strong>Bayar</strong>.
    </>,
    "Kemudian akan terlihat QR Code dari pembayaran menggunakan QRIS.",
    <>
      Tekan tombol <strong>Unduh QRIS</strong> untuk menyimpan QR Code nya.
    </>,
    <>
      Buka <strong>aplikasi dompet elektronik</strong> yang anda miliki dan
      mendukung fasilitas QRIS, lalu <strong>Masukkan QR Code QRIS</strong> yang
      sudah diunduh sebelumnya.
    </>,
    <>
      Periksa kembali detail pembayaran anda. Jika sudah sesuai,{" "}
      <strong>Konfirmasi</strong> dan <strong>Bayar</strong>.
    </>,
    <>
      Transaksi <strong>Berhasil</strong>
    </>,
    <>
      Buka website <strong>SPPku</strong> dan cek kembali transaksi anda.
    </>,
  ];

  const MinimarketInstructions = [
    "Sampaikan kepada kasir Minimarket untuk melakukan pembayaran.",
    <>
      Tunjukkan kode pembayaran ke kasir dan lakukan pembayaran sebesar{" "}
      <span className="text-merahNormal">
        Rp {totalAmount.toLocaleString("id-ID")}
      </span>
    </>,
    "Setelah transaksi berhasil, kamu akan mendapatkan bukti pembayaran. Mohon simpan bukti pembayaran sebagai jaminan apabila diperlukan verifikasi lebih lanjut.",
    <>
      Pembayaran SPP kamu akan terverifikasi secara otomatis dalam website{" "}
      <strong>SPPku</strong> setelah pembayaran berhasil.
    </>,
  ];

  const handlePayClick = () => {
    if (payUrl) {
      navigate(`${ROUTE_SPP}/${ids}/metode/payment/qris`, {
        state: {
          totalAmount,
          payUrl,
          expiredTime,
        },
      });
    }
  };

  const handleBackClick = () => {
    navigate("/spp");
  };

  const { setHideLayout } = useLayout();

  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-putihNormal">
      <div className="top-0 w-full bg-kuningNormal text-start text-4xl text-white py-8 px-24 rounded-b-3xl font-medium phone:px-6 phone:text-2xl phone:py-4">
        Pembayaran
      </div>
      <AmountTime
        amount={totalAmount}
        expiredTime={expiredTime}
        isExpired={false}
        payUrl={payUrl}
      />

      <div className="flex flex-col items-center py-4 phone:px-4 px-24 space-y-8">
        {payUrl ? null : (
          <CodePaymentWrapper
            billCode={billCode}
            billKey={billKey}
            vaNumber={vaNumber}
            paymentCode={paymentCode}
            paymentType={paymentType}
            merchantId={merchantId}
          />
        )}

        <div className="w-full space-y-4">
          {/* jika payUrl tidak null */}
          {payUrl && (
            <AccordionDescription
              label="Petunjuk Pembayaran QRIS"
              instructions={QrisInstruction}
            />
          )}

          {/* jika paymentCode tidak null */}
          {paymentCode && (
            <AccordionDescription
              label="Petunjuk Pembayaran Melalui Minimarket"
              instructions={MinimarketInstructions}
            />
          )}

          {/* jika vaNumber tidak null */}
          {vaNumber && (
            <div className="space-y-6">
              <AccordionDescription
                label="Petunjuk Transfer mBanking"
                instructions={mBankingInstructions}
              />
              <AccordionDescription
                label="Petunjuk Transfer iBanking"
                instructions={iBankingInstructions}
              />
              <AccordionDescription
                label="Petunjuk Transfer ATM"
                instructions={AtmInstructions}
              />
            </div>
          )}

          {/* jika billCode dan billKey tidak null */}
          {billCode && billKey && (
            <>
              <AccordionDescription
                label="Petunjuk Transfer mBanking Mandiri"
                instructions={mBankingMandiri}
              />
              <AccordionDescription
                label="Petunjuk Transfer ATM Mandiri"
                instructions={AtmMandiri}
              />
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center mt-8 w-full space-y-2 laptop:space-y-4">
          <>
            <Button
              className="text-sm laptop:text-lg font-bold"
              block
              onClick={payUrl ? handlePayClick : handleBackClick}
            >
              {payUrl ? "Bayar" : "OK"}
            </Button>
            {payUrl ? (
              <Button
                className="text-sm laptop:text-lg font-bold"
                block
                onClick={handleBackClick}
                variant="outline"
              >
                Kembali
              </Button>
            ) : null}
          </>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;
