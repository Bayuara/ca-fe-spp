import clsx from "clsx";
import { ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import InputLabel from "./InputLabel";

export type TTextFieldRounded = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ITextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerProps: React.HTMLAttributes<HTMLDivElement>;
  label: string;
  inputSize: "sm" | "md";
  rounded: TTextFieldRounded;
  error: boolean;
  helperText: string;
  suffix: ReactNode;
  register?: UseFormRegister<FieldValues>;
}

function TextField(props: Partial<ITextFieldProps>) {
  const {
    containerProps,
    label,
    id,
    type,
    placeholder,
    inputSize = "md",
    rounded = "2xl",
    error,
    helperText,
    suffix,
    className,
    register,
    name,
    ...otherProps
  } = props;

  const sizeStyle = {
    sm: "py-1 px-2",
    md: "py-3 px-2",
    xs: "py-0.5 px-1",
  };

  const roundStyle = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  const registerAttr = register ? register(name ?? "") : "";

  return (
    <div
      className={clsx("mb-3", containerProps?.className)}
      style={containerProps?.style}
    >
      {label ? (
        <InputLabel error={error} htmlFor={id}>
          {label}
        </InputLabel>
      ) : null}
      <div className={clsx({ relative: Boolean(suffix) })}>
        <input
          type={type}
          id={id}
          {...registerAttr}
          className={clsx(
            "w-full border",
            roundStyle[rounded],
            sizeStyle[inputSize],
            {
              "border-danger-300 focus:outline-danger-300": error,
            },
            className
          )}
          placeholder={placeholder}
          {...otherProps}
        />

        {suffix ? (
          <div className="absolute right-2.5 top-1.5 phone:top-2">{suffix}</div>
        ) : null}
      </div>

      {error && helperText ? (
        <span className="text-danger-300">{helperText}</span>
      ) : null}
    </div>
  );
}

export default TextField;
