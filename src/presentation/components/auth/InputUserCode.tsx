import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Button from "../common/Button";

const schema = yup.object({
  userCode: yup.string().required("Kode Pengguna harus diisi"),
});

interface InputUserCodeProps {
  onSubmit: (val: FieldValues) => Promise<void>;
  isLoading?: boolean;
}

const InputUserCodeForm: React.FC<InputUserCodeProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const getFormAttributes = (
    placeholder: string, // Parameter wajib
    name: keyof yup.InferType<typeof schema>, // Parameter wajib
    label?: string, // Parameter opsional
    description?: string // Parameter opsional
  ) => {
    const errObj = errors[name];
    return {
      label: label || "",
      placeholder,
      name,
      description,
      register,
      isError: !!errObj,
      helperText: errObj?.message as string,
    };
  };

  const handleTrimAndSubmit = (data: FieldValues) => {
    const trimmedData = {
      userCode: data.userCode.trim(),
    };
    onSubmit(trimmedData);
  };

  return (
    <form onSubmit={handleSubmit(handleTrimAndSubmit)}>
      <InputField
        {...getFormAttributes(
          "Masukkan Kode Pengguna", // placeholder (wajib)
          "userCode", // name (wajib)
          undefined // label (opsional)
          // "undefined",
          // "Masukkan Kode Pengguna",
          // "userCode"
          // "Masukkan Kode User anda"
        )}
        id="userCode"
      />
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        block
        type="submit"
        className="my-2"
      >
        Selanjutnya
      </Button>
    </form>
  );
};

export default InputUserCodeForm;
