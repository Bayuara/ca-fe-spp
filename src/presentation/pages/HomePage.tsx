import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Notification from "../components/home/Notification";
import ImgHome from "../assets/img-home.png";
import Button from "../components/common/Button";
import Greetings from "../components/home/Greetings";
import { Navigate } from "react-router-dom";
import SppService from "@/services/sppServices";
import clsx from "clsx";
import useWrapInvalidToken from "@/presentation/components/hooks/useWrapInvalidToken";

const HomePage: React.FC = () => {
  const [toSPP, setToSPP] = React.useState(false);
  const [unpaidMonths, setUnpaidMonths] = useState<number | null>(null);
  const WrappedFetchUnpaidMonths = useWrapInvalidToken(
    SppService.getPaymentByStatus,
  );

  useEffect(() => {
    const fetchUnpaidMonths = async () => {
      try {
        const responseUnpaidSpp = (await WrappedFetchUnpaidMonths(3)).page
          .totalItems;
        const responseWaitingSpp = (await WrappedFetchUnpaidMonths(2)).page
          .totalItems;
        setUnpaidMonths(responseUnpaidSpp + responseWaitingSpp);
      } catch (error) {
        setUnpaidMonths(0);
      }
    };

    fetchUnpaidMonths();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toSPP]);

  if (toSPP === true) {
    return <Navigate to="/spp" />;
  }

  // console.log("unpaidMonths: ", unpaidMonths);

  return (
    <div className="bg-putihNormal flex flex-col my-auto">
      <div
        className={clsx({
          invisible: unpaidMonths === null || unpaidMonths <= 0,
        })}
      >
        <Notification
          message={`PENGINGAT: Anda belum membayar SPP selama ${unpaidMonths} bulan terakhir. Segera lakukan pembayaran Anda!`}
          linkText="Ayo Bayar Sekarang"
          linkHref="/spp"
        />
      </div>
      <div className="mx-auto py-2 flex-grow flex items-center justify-center">
        <div className="flex flex-col laptop:flex-row items-center justify-between text-start laptop:text-left">
          <div className="mx-8 laptop:ml-14 laptop:w-1/2 laptop:pr-8 font-poppins">
            <div className="flex-1 flex items-center justify-center laptop:hidden">
              <img
                src={ImgHome}
                alt="Illustration"
                className="size-9/12 h-auto my-8"
              />
            </div>
            <Greetings />
            <p className="phone:text-xl text-3xl laptop:text-4xl pl-0 py-2 font-medium mb-4 mt-2">
              Selamat Datang di SPPku
            </p>
            <p className="phone:text-base text-lg mt-2 mb-10 font-normal">
              SPPku adalah website untuk pembayaran SPP sekolah dengan mudah,
              cepat, dan aman, memberikan kemudahan bagi orang tua dan siswa
              dalam mengelola kewajiban keuangan pendidikan
            </p>
            <Button block variant="default" onClick={() => setToSPP(true)}>
              Bayar SPP Sekarang
            </Button>
          </div>
          <div className="mt-4 justify-start items-center">
            <img
              src={ImgHome}
              alt="Payment Illustration"
              className="hidden w-9/12 h-auto laptop:block"
            />
          </div>
        </div>
      </div>
      <div className="ml-2 phone:mt-6 tablet:mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
