import React, { ReactNode } from "react";
import { TbRotateClockwise2 } from "react-icons/tb";
import clsx from "clsx";
// import { NavLink } from "react-router-dom";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  variant?: "default" | "outline" | "danger" | "custom";
  disabled?: boolean;
  isActive?: boolean;
  block?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
  children: React.ReactNode;
  iconPrefix?: ReactNode;
  iconSuffix?: ReactNode;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  fontBold?: "light" | "normal" | "bold" | "semibold" | "extrabold";
}

function Button(props: Partial<ButtonProps>) {
  const {
    children,
    onClick,
    fontBold = "semibold",
    variant = "default",
    disabled = false,
    block = false,
    rounded = "xl",
    iconPrefix,
    iconSuffix,
    type = "button",
    className,
    isLoading,
    isActive,
    ...otherProps
  } = props;

  const baseStyles =
    "font-poppins py-2 px-4 duration-300 phone:py-2 phone:px-1.5";
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  const fontStyles = {
    light: "font-light",
    normal: "font-normal",
    bold: "font-bold",
    semibold: "font-semibold",
    extrabold: "font-extrabold",
  };

  const styles = {
    default:
      "bg-hijauNormal phone:text-xs text-white border-2 border-hijauNormal hover:bg-hijauLightHover hover:text-hijauNormal hover:border-2 hover:border-hijauNormal active:bg-hijauNormal active:text-whiteLightActive hover:cursor-pointer",
    outline:
      "bg-transparent phone:text-xs border-2 border-hijauNormal text-hijauNormal hover:border-2 hover:bg-hijauLightHover hover:text-hitamNormal active:bg-hijauDarkHover active:text-whiteLightActive hover:cursor-pointer",
    danger:
      "bg-merahNormal phone:text-xs border border-merahNormal text-white hover:bg-putihNormalHover hover:text-hitamNormal hover:cursor-pointer",
    disabled:
      "opacity-50 cursor-not-allowed bg-putihDarkHover hover:bg-putihDarker phone:text-xs",
    custom: "",
  };

  const buttonClass = clsx(
    "transition-all",
    baseStyles,
    disabled ? styles.disabled : styles[variant],
    roundedStyles[rounded],
    fontStyles[fontBold],
    {
      "w-full": block,
      "active-class": isActive,
    },
    className
  );

  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 phone:gap-1",
        buttonClass
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      {...otherProps}
    >
      {iconPrefix ? <div>{iconPrefix}</div> : null}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <TbRotateClockwise2 className="animate-spin-clockwise size-6 mr-2" />
          <span>Loading...</span>
        </div>
      ) : (
        <>{children}</>
      )}
      {iconSuffix ? <div>{iconSuffix}</div> : null}
    </button>
  );
}

export default Button;
