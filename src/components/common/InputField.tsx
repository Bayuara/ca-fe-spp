import React, { forwardRef, ReactNode, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import clsx from "clsx";
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  helperText?: string;
  isError?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  description?: string;
  suffix?: ReactNode;
  className?: string;
  suffixOnClick?: () => void;
  isEditableClick?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      id,
      label,
      type,
      value,
      placeholder,
      onChange,
      helperText,
      name,
      register,
      isError = false,
      description,
      suffix,
      className,
      ...otherProps
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const registerAttr = register ? register(name ?? "") : {};

    return (
      <div className="mb-4 relative">
        {label ? (
          <label
            htmlFor={id}
            className="block text-sm laptop:text-lg font-bold text-hitamNormal"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : type}
            id={id}
            className={clsx(
              "mt-1 block w-full p-3 border rounded-xl shadow-sm focus:outline-none text-sm",
              {
                "border-red-500 focus:border-merahNormalActive": isError,
                "border-gray-300 focus:border-hijauNormalActive focus:border-2":
                  !isError,
              },
              "transition-all duration-300 ease-in-out placeholder:phone:text-xs",
              className
            )}
            value={value}
            onChange={onChange}
            {...registerAttr}
            placeholder={placeholder}
            // readOnly={!isEditable && Boolean(suffix)}
            {...otherProps}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
            >
              {showPassword ? <BsEye size={16} /> : <BsEyeSlash size={16} />}
            </button>
          )}

          {suffix && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {suffix}
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs phone:text-[0.55rem] text-gray-500 py-1 pt-3">
            {description}
          </p>
        )}
        {isError && helperText && (
          <p className="text-red-500 text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

export default InputField;
