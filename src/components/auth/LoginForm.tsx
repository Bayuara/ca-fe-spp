import React, { useMemo } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ROUTE_FORGET_PASSWORD } from "../routes/routes";

const schema = yup.object({
  userCode: yup.string().required("Kode Pengguna harus diisi"),
  password: yup
    .string()
    .min(8, "Password minimal 8 karakter")
    .required("Password harus diisi"),
});

interface FormProps {
  isLoading: boolean;
  onSubmit: (val: FieldValues) => Promise<void>;
}

const LoginForm: React.FC<FormProps> = ({ isLoading, onSubmit }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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

  const userCodeVal = watch("userCode");
  const passwordVal = watch("password");

  const navigate = useNavigate();

  const isDisabled = useMemo(
    () => !userCodeVal && !passwordVal,
    [userCodeVal, passwordVal]
  );

  const handleTrimAndSubmit = (data: FieldValues) => {
    // Trim the input values
    const trimmedData = {
      ...data,
      userCode: data.userCode.trim(),
      password: data.password.trim(),
    };

    onSubmit(trimmedData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleTrimAndSubmit)}
      className="space-y-4 mb-8 text-lg"
    >
      <InputField
        {...getFormAttributes(
          "Kode Pengguna",
          "Masukkan Kode Pengguna",
          "userCode"
        )}
        id="userCode"
      />
      <InputField
        {...getFormAttributes("Kata Sandi", "Masukkan Kata Sandi", "password")}
        id="password"
        type="password"
        // description="Pastikan kata sandi terdiri dari minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka."
      />
      {/* <Button variant="custom" className="font-normal text-xs p-0 flex justify-end">Lupa Kata Sandi?</Button> */}
      <div className="flex justify-end">
        <Button
          variant="custom"
          className="text-sm p-0 text-hijauNormal"
          onClick={() => navigate(ROUTE_FORGET_PASSWORD)}
          fontBold="normal"
        >
          Lupa Kata Sandi?
        </Button>
      </div>
      <Button
        isLoading={isLoading}
        disabled={isDisabled || isLoading}
        block
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
