import { useMemo } from "react";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../common/InputField";
import Button from "../common/Button";

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

interface ForgetPasswordProps {
  onSuccessChangePassword: (val: FieldValues) => Promise<void>;
  isLoading?: boolean;
}

const ForgetPassword = (props: ForgetPasswordProps) => {
  const { isLoading, onSuccessChangePassword } = props;

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const getFormAttributes = (
    placeholder: string,
    name: keyof yup.InferType<typeof schema>,
    label?: string,
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

  const passwordVal = watch("password");
  const confirmPasswordVal = watch("confirmPassword");

  const isDisabled = useMemo(
    () => !passwordVal && !confirmPasswordVal && !isValid,
    [passwordVal, confirmPasswordVal, isValid]
  );

  const onSubmit = (data: FieldValues) => {
    onSuccessChangePassword(data);
  };

  return (
    <form className="space-y-8 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <InputField
          {...getFormAttributes("Masukkan Kata Sandi Baru Anda", "password")}
          id="password"
          type="password"
        />
        <InputField
          {...getFormAttributes(
            "Masukkan Ulang Kata Sandi Baru Anda",
            "confirmPassword"
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

export default ForgetPassword;
