import clsx from "clsx";
import React from "react";

interface ITableControlProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  text?: React.ReactNode;
}

function TableControl(props: ITableControlProps) {
  const { className, icon, text, ...otherProps } = props;
  return (
    <button
      className={clsx("flex flex-col items-center gap-2 phone:gap-1", className)}
      {...otherProps}
    >
      {icon}
      {text ? (
        <span className="font-medium text-xs text-nowrap phone:text-[0.55rem]">{text}</span>
      ) : null}
    </button>
  );
}

export default TableControl;
