import React from "react";

interface IBannerProps {
  className?: string;
}

const Banner: React.FC<IBannerProps> = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns month from 0-11, so add 1.

  // Tentukan tahun ajaran
  const tahunAjaran =
    currentMonth <= 6
      ? `${currentYear - 1}/${currentYear}`
      : `${currentYear}/${currentYear + 1}`;

  // Tentukan semester
  const semester = currentMonth <= 6 ? "Genap" : "Ganjil";

  return (
    <div className="bg-[#FBC619] text-center rounded-lg py-3 px-6 text-xs tablet:text-base laptop:text-lg font-semibold font-poppins text-hijauDark tablet:w-fit laptop:w-6/12">
      Pembayaran SPP Siswa Semester {tahunAjaran} ({semester})
    </div>
  );
};

export default Banner;
