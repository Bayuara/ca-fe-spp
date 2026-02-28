import React, { useEffect, useState } from "react";
import PersonalInfo from "../components/profile/PersonalInfo";
import ChangeInfoProfileForm from "../components/auth/ChangeInfoProfileForm";

import { PiIdentificationCard } from "react-icons/pi";
import { GoPersonFill } from "react-icons/go";
import { BsCalendarDateFill } from "react-icons/bs";
import { PiGenderIntersexBold } from "react-icons/pi";
import { PiVideoConferenceFill } from "react-icons/pi";
import { PiListNumbersFill } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
import { IconType } from "react-icons";
import { useLayout } from "@/presentation/components/hooks/useLayout";
import { useAuth } from "@/presentation/components/hooks/useAuth";
import { useProfile } from "@/presentation/hooks/useProfile";
import { capitalizeEachWord } from "@/utils/stringUtils";

import avatar from "../assets/avatar.png";
import SuccessModals from "@/presentation/components/common/SuccessModals";

interface PersonalInfoItem {
  label: string;
  value: string;
  type: string;
  icon?: IconType;
  editable?: boolean;
  isEditing?: boolean;
}

const ProfilePage: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [infoUpdated, setInfoUpdated] = useState(false);
  const { user } = useAuth();
  const { changeProfile } = useProfile();
  const [updatedEmail, setUpdatedEmail] = useState<string | undefined>(
    undefined,
  );
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState<
    string | undefined
  >(undefined);
  const { setHideLayout } = useLayout();

  const imageUrl = user?.userDetail?.imgUrl
    ? `${import.meta.env.VITE_BASE_URL}${user.userDetail.imgUrl}`
    : avatar;

  useEffect(() => {
    if (user) {
      const updatePersonalInfo = () => {
        setPersonalInfo([
          {
            label: "Nama Lengkap",
            value: capitalizeEachWord(user?.name ?? ""),
            type: "text",
            icon: PiIdentificationCard,
          },
          {
            label: "Nama Panggilan",
            value: capitalizeEachWord(user.userDetail.nickname ?? ""),
            type: "text",
            icon: GoPersonFill,
          },
          {
            label: "Tempat Tanggal Lahir",
            value:
              user.userDetail.birthPlace && user.userDetail.birthDate
                ? `${user.userDetail.birthPlace}, ${new Date(user.userDetail.birthDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`
                : user.userDetail.birthPlace || "",
            type: "text",
            icon: BsCalendarDateFill,
          },
          {
            label: "Jenis Kelamin",
            value: user.userDetail.gender.name,
            type: "text",
            icon: PiGenderIntersexBold,
          },
          {
            label: "NISN",
            value: user.userDetail.nisn || "",
            type: "text",
            icon: PiVideoConferenceFill,
          },
          {
            label: "Kode Akun",
            value: user.userCode || "",
            type: "text",
            icon: PiListNumbersFill,
          },
          {
            label: "Kategori",
            value: user.userDetail.userCategory.name || "",
            type: "text",
            icon: PiStudentFill,
          },
          {
            label: "Email",
            value: user.userDetail.email || "",
            type: "email",
          },
          {
            label: "No. Handphone",
            value: user.userDetail.phoneNumber || "",
            type: "text",
          },
        ]);
      };
      updatePersonalInfo();
    }
  }, [user, updatedEmail, updatedPhoneNumber, infoUpdated]);

  const handleInfoUpdate = async (
    email: string,
    phoneNumber: string,
  ): Promise<boolean> => {
    const success = await changeProfile(email, phoneNumber);
    if (success) {
      setUpdatedEmail(email);
      setUpdatedPhoneNumber(phoneNumber);
      setShowModal(true);
      setInfoUpdated((prev) => !prev);
    }
    return success;
  };

  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
  }, [setHideLayout]);

  return (
    <div className="bg-putihNormal">
      <div className="bg-hijauNormal text-white text-center py-4 laptop:py-8 rounded-b-3xl">
        <h1 className="text-2xl font-normal text-white">Profile</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-xl py-8 laptop:py-12 mt-12 mb-8 mx-5 laptop:mx-20">
        <div className="text-center">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-40 h-40 tablet:w-48 tablet:h-48 laptop:w-80 laptop:h-80 rounded-full mx-auto object-cover"
          />
          <h2 className="text-2xl tablet:text-3xl laptop:text-4xl font-semibold mt-4">
            {capitalizeEachWord(user?.name ?? "")}
          </h2>
          <div className="flex justify-center m-2 gap-1">
            <span className="bg-red-500 text-white w-4/12 max-w-40 mt-2 rounded-lg text-xl font-medium">
              {user?.userDetail.class.name.toUpperCase()}
            </span>
            <span className="bg-green-600 text-white w-4/12 max-w-40 mt-2 rounded-lg text-xl ml-2 font-medium">
              {user?.userDetail.admissionYear}
            </span>
          </div>
          <p className="text-hitamNormal mt-11 font-medium text-xl tablet:text-2xl laptop:text-3xl">
            Wali Kelas
          </p>
          <p className="text-putihDarker mt-4 ml-2 font-normal text-lg laptop:text-2xl">
            {user?.userDetail.homeroomTeacher.name}
          </p>
        </div>
      </div>
      <div className="bg-putihNormal rounded-2xl p-4 pb-0.5 mb-8 laptop:mx-20">
        <div className="space-y-4 my-1 text-sm">
          {personalInfo
            .filter(
              (info) =>
                info.label !== "Email" && info.label !== "No. Handphone",
            )
            .map((info, index) => (
              <PersonalInfo
                key={index}
                icon={info.icon}
                label={info.label}
                value={info.value}
              />
            ))}
          <ChangeInfoProfileForm
            defaultValue={{
              initialEmail: user?.userDetail.email || "",
              initialPhoneNumber: user?.userDetail.phoneNumber || "",
            }}
            onSaveInfo={handleInfoUpdate}
          />
        </div>
      </div>
      {showModal && (
        <SuccessModals
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          closable
          description="Informasi profil Anda telah berhasil diperbarui."
        />
      )}
    </div>
  );
};

export default ProfilePage;
