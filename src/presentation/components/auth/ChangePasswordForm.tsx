import React, { useMemo } from "react";
import InputField from "../common/InputField"; // Mengimpor komponen InputField
import Button from "../common/Button"; // Mengimpor komponen Button
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  password: yup
    .string()
    .min(8, "Password Harus Minimal 8 Karakter")
    .matches(/^\S*$/, "Password tidak boleh mengandung spasi")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).*$/,
      "Password harus mengandung minimal 1 huruf kapital dan 1 huruf kecil"
    )
    .matches(/^(?=.*\d).*$/, "Password harus mengandung minimal 1 angka")
    .required("Kata Sandi Baru Perlu Diisi"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Konfirmasi Password Tidak Sama dengan Password Baru"
    )
    .required("Konfirmasi Password Harus Diisi"),
});

interface ChangePasswordFormProps {
  isLoading: boolean;
  onSuccessChangePassword: (val: FieldValues) => Promise<void>;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  isLoading,
  onSuccessChangePassword,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const getFormAttributes = (
    label: string,
    placeholder: string,
    name: keyof yup.InferType<typeof schema>,
    description?: string
  ) => {
    const errObj = errors[name];
    return {
      label,
      placeholder,
      name,
      description,
      register,
      isError: !!errObj,
      helperText: errObj?.message as string,
    };
  };
  // const [isError, setIsError] = useState(false);

  const passwordVal = watch("password");
  const confirmPasswordVal = watch("confirmPassword");

  const isDisabled = useMemo(
    () => !passwordVal && !confirmPasswordVal && !isValid,
    [passwordVal, confirmPasswordVal, isValid]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: FieldValues) => {
    onSuccessChangePassword(data);
  };

  return (
    <form className="space-y-8 w-full phone:space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <InputField
          {...getFormAttributes(
            "Kata Sandi Baru",
            "Masukkan Kata Sandi Baru Anda",
            "password",
            "Pastikan kata sandi terdiri dari minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka."
          )}
          id="password"
          type="password"
        />
        <InputField
          {...getFormAttributes(
            "Konfirmasi Kata Sandi Baru",
            "Masukkan Kata Sandi Baru Anda",
            "confirmPassword",
            "Pastikan kata sandi terdiri dari minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka."
          )}
          id="confirmPassword"
          type="password"
        />
      </div>
      <Button
        isLoading={isLoading}
        disabled={isDisabled || isLoading}
        block
        type="submit"
        className="my-4"
      >
        Ubah Kata Sandi
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
