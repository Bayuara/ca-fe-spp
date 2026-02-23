import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { RiRadioButtonFill } from "react-icons/ri";
import clsx from "clsx";
import VAPicture from "../assets/VA.svg";
import QRIS from "../assets/QRIS.svg";
import miniMarketPicture from "../assets/minimarket.svg";
import alfamart from "../assets/Logo_Alfamart.png";
import indomart from "../assets/Logo_Indomaret.png";
import Button from "../components/common/Button";
import { useLayout } from "@/components/hooks/useLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import LogoMandiri from "../assets/bank-mandiri.svg";
import LogoBNI from "../assets/bank-bni.svg";
import LogoBRI from "../assets/bank-bri.svg";
import LogoBCA from "../assets/bank-bca.svg";
import SppService from "@/services/sppServices";
import { ROUTE_SPP } from "@/components/routes/routes";
// import AccordionDescription from "@/components/payment/AccordionDescription";
import OrderedList from "@/components/layout/OrderedList";
import icMoney from "../assets/ic-MoneyWavy.svg";
import { useAuth } from "@/components/hooks/useAuth";

const MethodPayment: React.FC = () => {
  const navigate = useNavigate();
  const { ids } = useParams<{ ids: string }>();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedMinimarket, setSelectedMinimarket] = useState<string | null>(
    null,
  );
  // const [openItem, setOpenItem] = useState<string | null>(null);
  const [isSelectQris, setIsSelectQris] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    tunai: false,
    va: false,
    minimarket: false,
    // qris: false,
  });

  const { user } = useAuth();
  console.log(user);
  const isPaymentCashless = user?.customer.isPaymentCashless;

  const handleConfirmation = async () => {
    setIsLoading(true);
    let url = "";
    let bodyData = {};

    if (selectedMethod === "Virtual Account" && selectedBank) {
      url = `payment/bank/${selectedBank}`;
      bodyData = { sppId: ids?.split(",").map(Number) };
    } else if (selectedMethod === "Minimarket" && selectedMinimarket) {
      const csstore =
        selectedMinimarket === "Alfamart / Alfamidi" ? "alfamart" : "indomaret";
      bodyData = { sppId: ids?.split(",").map(Number) };
      url = `payment/counter/${csstore}`;
    } else if (selectedMethod === "QRIS" || isSelectQris === true) {
      url = "payment/qris";
      bodyData = { sppId: ids?.split(",").map(Number) };
    }

    if (url) {
      try {
        // console.log(
        //   "Sending request to url:",
        //   `${import.meta.env.VITE_API_URL}/${url}`
        // );
        // console.log("With body:", bodyData);

        const response = await SppService.submitPayment(url, bodyData);

        // console.log("Response data:", response);

        const paymentData = response.data[0];
        // console.log("Payment data:", paymentData);
        // console.log("Response data after paymentData: ", response);

        navigate(`${ROUTE_SPP}/${ids}/metode/payment`, {
          state: {
            billCode: paymentData.billCode,
            billKey: paymentData.billKey,
            vaNumber: paymentData.vaNumber,
            paymentCode: paymentData.paymentCode,
            payUrl: paymentData.payUrl,
            totalAmount: paymentData.totalAmount,
            expiredTime: paymentData.expiredTime,
            paymentType: paymentData.paymentType,
            merchantId: paymentData.merchantId,
          },
        });

        // console.log("Request Body:", JSON.stringify(bodyData));
      } catch (error) {
        // console.error("Error fetching payment URL:", error);
        toast.error("Terjadi kesalahan saat memproses pembayaran.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      if (!isPaymentCashless) {
        navigate(`${ROUTE_SPP}`);
      } else {
        toast.info("Silakan pilih metode pembayaran terlebih dahulu.");
      }
    }
  };

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);

    if (method === "QRIS") {
      setSelectedMinimarket(null);
      setSelectedBank(null);
      setIsSelectQris(true);
    } else if (method === "Tunai") {
      setDropdownStates((prev) => ({
        tunai: !prev.tunai,
        va: false,
        minimarket: false,
        // qris: false,
      }));
    } else if (method === "Virtual Account") {
      setDropdownStates((prev) => ({
        tunai: false,
        va: !prev.va,
        minimarket: false,
        // qris: false,
      }));
    } else if (method === "Minimarket") {
      setDropdownStates((prev) => ({
        tunai: false,
        va: false,
        minimarket: !prev.minimarket,
        // qris: false,
      }));
    } else {
      setDropdownStates({
        tunai: false,
        va: false,
        minimarket: false,
        // qris: false,
      });
    }
  };

  const handleSelectMinimarket = (minimarket: string) => {
    setSelectedMinimarket(minimarket);
    setSelectedMethod("Minimarket");
    setSelectedBank(null);
    setIsSelectQris(false);
  };

  const handleSelectBank = (bank: string) => {
    setSelectedBank(bank);
    setSelectedMethod("Virtual Account");
    setSelectedMinimarket(null);
    setIsSelectQris(false);
    // setDropdownStates({
    //   tunai: false,
    //   va: false,
    //   minimarket: false,
    // });
  };

  const { setHideLayout } = useLayout();

  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TunaiInstructions = [
    <>
      <p>
        Kunjungi sekolah kapan saja selama jam kerja untuk melakukan pembayaran
        SPP secara tunai.
      </p>
    </>,
    <>
      <p>
        Pastikan Anda membawa identitas diri dan serahkan uang tunai sesuai
        dengan jumlah yang harus dibayarkan kepada petugas di loket pembayaran
        sekolah.
      </p>
    </>,
    <>
      <p>
        Setelah pembayaran diverifikasi oleh admin sekolah atau petugas loket
        pembayaran, status pembayaran di akun SPP Ku Anda akan otomatis berubah
        menjadi lunas.
      </p>
    </>,
  ];

  return (
    <div className="min-h-screen bg-putihNormal">
      <div className="top-0 w-full bg-kuningNormal text-start text-4xl text-white py-8 px-24 rounded-b-3xl font-medium phone:px-6 phone:text-2xl phone:py-4">
        {!isPaymentCashless ? "Info Pembayaran" : "Metode Pembayaran"}
      </div>
      <div className="flex flex-col items-center py-10 phone:pt-4">
        <div className="w-11/12">
          <div className="mb-6 text-sm tablet:text-xl laptop:text-2xl text-center font-medium">
            {!isPaymentCashless
              ? ""
              : "Mohon pilih metode pembayaran Anda untuk melanjutkan proses"}
          </div>
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue={!isPaymentCashless ? "item-1" : undefined}
          >
            {/* Tunai */}
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={clsx(
                  "bg-putihLight flex items-center border border-hitamLightHover px-6",
                  {
                    "rounded-xl": !dropdownStates.tunai,
                    "rounded-t-xl rounded-b-none": dropdownStates.tunai,
                  },
                )}
                onClick={() => handleSelectMethod("Tunai")}
              >
                <div className="flex items-center space-x-4 py-0">
                  <img src={icMoney} alt="" className="size-16 phone:size-10" />
                  <span className="text-sm font-medium flex items-center laptop:text-lg">
                    {/* {isDropdownOpen ? "Tunai" : "Petunjuk Pembayaran Tunai"} */}
                    {dropdownStates.tunai
                      ? "Petunjuk Pembayaran Tunai"
                      : "Tunai"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-putihLight border border-hitamLightHover rounded-b-lg p-3 laptop:p-6 px-8">
                  <OrderedList instructions={TunaiInstructions} />
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* VA */}
            <AccordionItem
              value="item-2"
              className={clsx({ hidden: !isPaymentCashless })}
            >
              <AccordionTrigger
                className={clsx(
                  "bg-putihLight flex items-center border border-hitamLightHover px-6",
                  {
                    "rounded-xl": !dropdownStates.va,
                    "rounded-t-xl rounded-b-none": dropdownStates.va,
                  },
                )}
                onClick={() => handleSelectMethod("Virtual Account")}
              >
                <div className="flex items-center gap-3 phone:gap-1">
                  <img
                    src={VAPicture}
                    alt="Virtual Account"
                    className="size-16 phone:size-10"
                  />
                  <span className="text-xs font-medium flex items-center laptop:text-lg">
                    Transfer Virtual Account
                  </span>
                  {selectedBank ? (
                    <>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          backgroundColor: "#d9d9d9",
                          margin: "",
                        }}
                      />
                      <img
                        src={clsx(
                          selectedBank === "mandiri" && LogoMandiri,
                          selectedBank === "bni" && LogoBNI,
                          selectedBank === "bri" && LogoBRI,
                          selectedBank === "bca" && LogoBCA,
                        )}
                        alt=""
                        className="object-scale-down size-16 phone:size-10"
                      />
                      <span className="text-xs font-medium flex items-center laptop:text-lg hover:no-underline">
                        {selectedBank === "mandiri" && "Mandiri"}
                        {selectedBank === "bni" && "BNI"}
                        {selectedBank === "bri" && "BRI"}
                        {selectedBank === "bca" && "BCA"}
                      </span>
                    </>
                  ) : null}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-putihLight border border-hitamLightHover rounded-b-lg">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => handleSelectBank("mandiri")}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={LogoMandiri}
                        alt="Bank Mandiri"
                        className="size-16 phone:size-10"
                      />
                      <span className="text-sm font-medium flex items-center laptop:text-lg">
                        Mandiri
                      </span>
                    </div>
                    {selectedBank === "mandiri" ? (
                      <RiRadioButtonFill size={25} color="#0b654a" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked size={25} />
                    )}
                  </div>
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => handleSelectBank("bca")}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={LogoBCA}
                        alt="Bank BCA"
                        className="size-16 phone:size-10"
                      />
                      <span className="text-sm font-medium flex items-center laptop:text-lg">
                        BCA
                      </span>
                    </div>
                    {selectedBank === "bca" ? (
                      <RiRadioButtonFill size={25} color="#0b654a" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked size={25} />
                    )}
                  </div>
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => handleSelectBank("bni")}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={LogoBNI}
                        alt="Bank BNI"
                        className="size-16 phone:size-10"
                      />
                      <span className="text-sm font-medium flex items-center laptop:text-lg">
                        BNI
                      </span>
                    </div>
                    {selectedBank === "bni" ? (
                      <RiRadioButtonFill size={25} color="#0b654a" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked size={25} />
                    )}
                  </div>
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => handleSelectBank("bri")}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={LogoBRI}
                        alt="Bank BRI"
                        className="size-16 phone:size-10"
                      />
                      <span className="text-sm font-medium flex items-center laptop:text-lg">
                        BRI
                      </span>
                    </div>
                    {selectedBank === "bri" ? (
                      <RiRadioButtonFill size={25} color="#0b654a" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked size={25} />
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* QRIS */}
            <AccordionItem
              value="item-3"
              className={clsx(
                "bg-putihLight flex items-center justify-between py-4 px-6 border rounded-lg cursor-pointer",
                {
                  "border-hijauNormal": selectedMethod === "QRIS",
                  "border-gray-300": selectedMethod !== "QRIS",
                },
                { hidden: !isPaymentCashless },
              )}
              onClick={() => handleSelectMethod("QRIS")}
            >
              <div className="flex items-center space-x-4">
                <img src={QRIS} alt="QRIS" className="size-16 phone:size-10" />
                <span className="text-sm font-medium flex items-center laptop:text-lg">
                  QRIS
                </span>
              </div>
              {/* {selectedMethod === "QRIS" ? ( */}
              {isSelectQris === true ? (
                <RiRadioButtonFill size={24} color="#0b654a" />
              ) : (
                <MdOutlineRadioButtonUnchecked size={24} />
              )}
            </AccordionItem>
            {/* MiniMarket */}
            <AccordionItem
              value="item-4"
              className={clsx({ hidden: !isPaymentCashless })}
            >
              <AccordionTrigger
                className={clsx(
                  "bg-putihLight flex items-center border border-hitamLightHover px-6",
                  {
                    "rounded-xl": !dropdownStates.minimarket,
                    "rounded-t-xl rounded-b-none": dropdownStates.minimarket,
                  },
                )}
                onClick={() => {
                  handleSelectMethod("Minimarket");
                }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={miniMarketPicture}
                    alt="Minimarket"
                    className="size-16 phone:size-10 object-scale-down"
                  />
                  <span className="text-sm font-medium flex items-center laptop:text-lg">
                    Minimarket
                  </span>
                  {selectedMinimarket ? (
                    <>
                      <div
                        style={{
                          width: "1px",
                          height: "50px",
                          backgroundColor: "#d9d9d9",
                          margin: "",
                        }}
                      />
                      <img
                        src={clsx(
                          selectedMinimarket === "Indomaret" && indomart,
                          selectedMinimarket === "Alfamart / Alfamidi" &&
                            alfamart,
                        )}
                        alt=""
                        className="object-scale-down size-16 phone:size-10"
                      />
                      <span className="text-sm font-medium flex items-center laptop:text-lg">
                        {selectedMinimarket === "Indomaret" && "Indomaret"}
                        {selectedMinimarket === "Alfamart / Alfamidi" &&
                          "Alfamart / Alfamidi"}
                      </span>
                    </>
                  ) : null}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-putihLight border border-hitamLightHover rounded-b-xl">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() =>
                      handleSelectMinimarket("Alfamart / Alfamidi")
                    }
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={alfamart}
                        alt="Alfamart / Alfamidi"
                        className="size-16 phone:size-10 object-scale-down bg-blend-multiply"
                      />
                      <span className="text-sm font-medium flex items-center laptop:text-lg border-t-0">
                        Alfamart / Alfamidi
                      </span>
                    </div>
                    {selectedMinimarket === "Alfamart / Alfamidi" ? (
                      <RiRadioButtonFill size={25} color="#0b654a" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked size={25} />
                    )}
                  </div>
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => handleSelectMinimarket("Indomaret")}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={indomart}
                        alt="Indomaret"
                        className="size-16 phone:size-10 object-scale-down"
                      />
                      <span className="text-sm font-medium flex items-center laptop:text-lg">
                        Indomaret
                      </span>
                    </div>
                    {selectedMinimarket === "Indomaret" ? (
                      <RiRadioButtonFill size={25} color="#0b654a" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked size={25} />
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-8 space-y-4">
            <Button
              onClick={handleConfirmation}
              className="text-sm laptop:text-lg py-1 laptop:py-2 font-bold mb-2"
              block
              disabled={isLoading}
              isLoading={isLoading}
              variant={isPaymentCashless ? "default" : "outline"}
            >
              {isPaymentCashless ? "Konfirmasi" : "Kembali"}
            </Button>
            {isPaymentCashless ? (
              <Button
                onClick={() => navigate(`${ROUTE_SPP}/${ids}`)}
                variant="outline"
                disabled={isLoading}
                className="text-sm laptop:text-lg py-1 font-bold mb-2"
                block
              >
                Kembali
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodPayment;
