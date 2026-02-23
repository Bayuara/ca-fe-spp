import { useEffect } from "react";
import { useLayout } from "@/components/hooks/useLayout";
import mukaMerah from "../assets/mukamerah.svg";
import Logo from "/Logo.svg";

const NotFoundPage = () => {
  const { setHideLayout } = useLayout();

  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative min-h-screen">
      <img
        src={Logo}
        alt="Logo"
        className="absolute top-4 left-4 size-8 tablet:size-10 laptop:size-12"
      />

      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <img
          src={mukaMerah}
          alt="Muka Merah"
          className="w-28 laptop:w-40 mb-8"
        />
        <h1 className="text-lg tablet:text-xl laptop:text-2xl text-red-500 mb-6">
          404 Not Found
        </h1>
        <h1 className="text-lg tablet:text-xl laptop:text-2xl text-red-500">
          Laman Yang Anda Tuju Tidak Ditemukan
        </h1>
        <p className="text-sm tablet:text-lg laptop:text-xl text-red-500">
          Silakan pergi ke halaman sebelumnya
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
