import React, { useState, useMemo, useEffect } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputField from "../common/InputField";
import Button from "../common/Button";
import ChangePasswordForm from "./ChangePasswordForm";
import Modals from "../common/Modals";
import { useResetPassword } from "@/presentation/hooks/useResetPassword";
import { IoChevronForward } from "react-icons/io5";
import { PiPencilLineLight } from "react-icons/pi";
import { toast } from "sonner";
import clsx from "clsx";
import SuccessModals from "../common/SuccessModals";

const schemaChangeInfo = yup.object({
  email: yup
    .string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Nomor HP harus berupa angka")
    .required("Nomor HP tidak boleh kosong"),
});

interface ChangeInfoProfileFormProps {
  defaultValue: { initialEmail: string; initialPhoneNumber: string };
  onSaveInfo: (email: string, phoneNumber: string) => Promise<boolean>;
}

const ChangeInfoProfileForm: React.FC<ChangeInfoProfileFormProps> = ({
  defaultValue,
  onSaveInfo,
}) => {
  const { resetPassword } = useResetPassword();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<yup.InferType<typeof schemaChangeInfo>>({
    resolver: yupResolver(schemaChangeInfo),
    defaultValues: {
      email: defaultValue.initialEmail,
      phoneNumber: defaultValue.initialPhoneNumber,
    },
  });

  const getFormAttributes = (
    label: string,
    name: keyof yup.InferType<typeof schemaChangeInfo>,
    id: string,
    placeholder: string,
    register: UseFormRegister<yup.InferType<typeof schemaChangeInfo>>,
    isError: FieldErrors<yup.InferType<typeof schemaChangeInfo>>
  ) => {
    const errObj = isError[name] ?? null;
    return {
      label,
      name,
      id,
      placeholder,
      register,
      isError: !!errObj,
      helperText: errObj?.message,
    };
  };

  useEffect(() => {
    setValue("email", defaultValue.initialEmail);
    setValue("phoneNumber", defaultValue.initialPhoneNumber);
  }, [defaultValue, setValue]);

  const emailInput = watch("email");
  const phoneNumberInput = watch("phoneNumber");

  const isFormChanged = useMemo(
    () =>
      emailInput !== defaultValue.initialEmail ||
      phoneNumberInput !== defaultValue.initialPhoneNumber,
    [
      emailInput,
      defaultValue.initialEmail,
      phoneNumberInput,
      defaultValue.initialPhoneNumber,
    ]
  );

  // console.log("defaultValue email: " + defaultValue.initialEmail);

  const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] =
    useState(false);

  const [
    isChangePasswordSuccessModalOpen,
    setIsChangePasswordSuccessModalOpen,
  ] = useState(false);

  const [editableFields, setEditableFields] = useState<{
    email: boolean;
    phoneNumber: boolean;
  }>({
    email: false,
    phoneNumber: false,
  });

  const onSubmit = async (data: yup.InferType<typeof schemaChangeInfo>) => {
    const success = await onSaveInfo(data.email, data.phoneNumber);
    if (success) {
      // Make fields read-only after successful submission
      setEditableFields({
        email: false,
        phoneNumber: false,
      });
    }
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (val: unknown): Promise<void> => {
    setLoading(true);
    try {
      const formData = val as { password: string; confirmPassword: string };
      await resetPassword(formData);
    } catch (error) {
      const err = error as Error;
      toast.error(`Gagal Reset Password: ${err?.message || "Terjadi kesalahan"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          {...getFormAttributes(
            "Email",
            "email",
            "email",
            "Masukkan Email Anda",
            register,
            errors
          )}
          id="email"
          suffix={
            <button
              type="button"
              onClick={() => {
                document.getElementById("email")?.focus();
                setEditableFields((prevState) => ({
                  ...prevState,
                  email: !prevState.email,
                }));
              }}
            >
              <PiPencilLineLight className="text-hijauNormal size-4 laptop:size-6" />
            </button>
          }
          readOnly={!editableFields.email}
          defaultValue={watch("email")}
          className={clsx({
            "bg-gray-200 cursor-not-allowed": !editableFields.email,
          })}
        />
        <InputField
          {...getFormAttributes(
            "No. Handphone",
            "phoneNumber",
            "phoneNumber",
            "Masukkan No. Handphone Anda",
            register,
            errors
          )}
          id="noHP"
          suffix={
            <button
              type="button"
              onClick={() => {
                document.getElementById("noHP")?.focus();
                setEditableFields((prevState) => ({
                  ...prevState,
                  phoneNumber: !prevState.phoneNumber,
                }));
              }}
            >
              <PiPencilLineLight className="text-hijauNormal size-4 laptop:size-6" />
            </button>
          }
          readOnly={!editableFields.phoneNumber}
          defaultValue={watch("phoneNumber")}
          className={clsx({
            "bg-gray-200 cursor-not-allowed": !editableFields.phoneNumber,
          })}
        />
        <h3 className="font-bold text-lg">Kata Sandi</h3>
        <div className="text-center">
          <Button
            onClick={() => setIsModalChangePasswordOpen(true)}
            className="bg-[#FFFFFF] text-hitamNormal py-3 flex justify-between text w-full mb-6 font-semibold border border-gray-400"
            variant="custom"
            iconSuffix={<IoChevronForward className="accent-hijauNormal" />}
          >
            Ubah Kata Sandi
          </Button>
        </div>
        <Button
          isLoading={loading}
          disabled={!isFormChanged || loading}
          block
          onClick={handleSubmit(onSubmit)}
        >
          Simpan Perubahan
        </Button>
        <Button
          variant="outline"
          block
          disabled={loading}
          className="mt-3"
          onClick={() => navigate("/")}
        >
          Kembali
        </Button>
      </form>

      {/* Modal Change Password */}
      <Modals
        isOpen={isModalChangePasswordOpen}
        onClose={() => setIsModalChangePasswordOpen(false)}
        title="Mohon buat kata sandi untuk mengamankan akun Anda!"
        closable
        size="3xl"
      >
        <div className="p-8 pt-6">
          <ChangePasswordForm
            isLoading={loading}
            onSuccessChangePassword={handleChangePassword}
          />
        </div>
      </Modals>
      {/* Modal Change Password end*/}

      {/* Modal Change Password success */}
      {/* <Modals
        isOpen={isChangePasswordSuccessModalOpen}
        onClose={() => setIsChangePasswordSuccessModalOpen(false)}
        size="3xl"
        closable
      >
        <div className="flex flex-col items-center p-8 pt-6">
          <img src={checkCircle} alt="Success" className="mb-4 size-48 mx-56" />
          <p className="text-gray-700 text-center text-lg font-semibold">
            Kata Sandi Anda Berhasil Diubah!
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => setIsChangePasswordSuccessModalOpen(false)}
            className="mx-4 mb-3"
            block
          >
            OK
          </Button>
        </div>
      </Modals> */}
      <SuccessModals
        isOpen={isChangePasswordSuccessModalOpen}
        onClose={() => setIsChangePasswordSuccessModalOpen(false)}
        closable
        description="Kata Sandi Anda Berhasil Diubah!"
        withButton
      />
      {/* Modal Change Password success end*/}
    </div>
  );
};

export default ChangeInfoProfileForm;
