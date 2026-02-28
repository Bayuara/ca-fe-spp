import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import caretDown from "../../assets/CaretDown.svg";
import { MdAccountCircle } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import clsx from "clsx";
import { useAuth } from "../hooks/useAuth";
import { capitalizeFirstLetter } from "@/utils/stringUtils";
import useWrapInvalidToken from "../hooks/useWrapInvalidToken";
import ConfirmationModals from "../common/ConfirmationModals";
import { useLogout } from "@/presentation/hooks/auth/UseLogout";

const Profile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { logout } = useLogout({ setLoading: setIsLoading });

  // console.log("test isPaymentCashless: ", user?.customer.isPaymentCashless);
  const wrappedLogout = useWrapInvalidToken(logout);

  const imageUrl = user?.userDetail?.imgUrl
    ? `${import.meta.env.VITE_BASE_URL}${user.userDetail.imgUrl}`
    : avatar;

  const handleConfirmLogout = async () => {
    await wrappedLogout();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  const dropDownClasses =
    "origin-top absolute laptop:top-16 left-1/2 transform -translate-x-1/2 w-51 rounded-md ring-opacity-5 focus:outline-none transition-all duration-300 ease-out";

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-center bg-putihLight rounded-full p-1"
    >
      <div
        onClick={toggleDropdown}
        className="laptop:p-2 p-1 w-auto flex justify-between items-center gap-1.5 laptop:gap-2 hover:cursor-pointer"
      >
        <div className="flex flex-row gap-2">
          <img
            className="size-8 object-cover rounded-full tablet:size-10 laptop:size-12"
            // src={`${import.meta.env.VITE_BASE_URL}${user?.userDetail.imgUrl}`}
            src={imageUrl}
          />
          <div className="flex flex-col text-left laptop:pr-10">
            <h1 className="font-bold text-xs tablet:text-sm laptop:text-base">
              {user?.userDetail.nickname
                ? capitalizeFirstLetter(user?.userDetail.nickname)
                : "Siswa"}
            </h1>
            <h2 className="phone:text-xs text-sm">
              {/* {upperCaseAllWords(user?.userDetail.class.name ?? "")} */}
              {/* {user?.userDetail.class.name ? upperCaseAllWords(user?.userDetail.class.name) : "" } */}
              {user?.userDetail.class.name
                ? user?.userDetail.class.name.toUpperCase()
                : ""}
            </h2>
          </div>
        </div>
        <img
          src={caretDown}
          alt="Caret Down"
          className="size-2.5 tablet:size-3 laptop:size-4"
        />
      </div>
      <div
        className={clsx(dropDownClasses, {
          "opacity-100 scale-100": isOpen,
          "opacity-0 scale-95 pointer-events-none": !isOpen,
        })}
      >
        <div className="container flex flex-col justify-center items-center p-3 bg-putihLight rounded-2xl">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center text-start w-40 px-2 py-2 text-sm rounded-lg bg-kuningNormal text-putihLightHover hover:bg-opacity-60 hover:border-opacity-60 mb-2 drop-shadow-2xl shadow-black border border-kuningDark 
            tablet:w-auto tablet:text-sm
            phone:w-full phone:justify-center phone:mb-1 phone:text-xs"
          >
            <MdAccountCircle className="size-4 tablet:size-6 laptop:size-7 mr-2" />
            Profile
          </button>
          <button
            onClick={handleLogoutClick}
            className="flex items-center text-start w-40 px-2 py-2 text-sm rounded-lg bg-merahNormal hover:bg-opacity-70 hover:border-opacity-60 text-putihLightHover drop-shadow-2xl shadow-black border border-merahDark
            tablet:w-auto tablet:text-sm
            phone:w-full phone:justify-center phone:text-xs"
          >
            <RxExit className="size-4 tablet:size-5 laptop:size-6 mr-2 ml-1" />
            Logout
          </button>
        </div>
      </div>

      <ConfirmationModals
        isOpen={isModalOpen}
        closable
        description="Apakah Kamu Yakin ingin Keluar dari akun SPPKu?"
        isLoading={isLoading}
        onClose={(val) => {
          // () => setIsModalOpen(false);
          if (val.confirmed) {
            handleConfirmLogout();
          } else {
            setIsModalOpen(false);
          }
        }}
        // onClose={hanldeConfirmationModal}
        // onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
