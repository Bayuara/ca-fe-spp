import React from "react";
import clsx from "clsx";
import { RxCross1 } from "react-icons/rx";

interface ModalsProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  closable?: boolean;
}

const Modals: React.FC<ModalsProps> = ({
  isOpen,
  children,
  className,
  title,
  size = "xl",
  onClose,
  closable,
}) => {
  if (!isOpen) return null;

  const sizeStyles = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 font-poppins",
        className
      )}
    >
      <div
        className={clsx(
          "animate-slideUp w-full rounded-2xl border-2 border-hijauNormal shadow-lg bg-putihLight relative phone:max-w-xs",
          sizeStyles[size]
        )}
      >
        {title && (
          <div
            className={clsx(
              "bg-kuningNormal p-2 rounded-xl w-full border-hijauNormal border-2 border-x-1 border-t-0",
              className
            )}
          >
            <h2 className="phone:text-lg text-xl font-semibold phone::m-0.5 m-1 text-putihNormal text-center phone:pr-4">
              {title}
            </h2>
          </div>
        )}
        {closable && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4"
            type="button"
          >
            <RxCross1 className="size-6 tablet:size-5 phone:size-4" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modals;
