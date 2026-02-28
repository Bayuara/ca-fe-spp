import clsx from "clsx";
import React from "react";

interface IInputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

function InputLabel(props: IInputLabelProps) {
  const { children, className, error, htmlFor, ...otherProps } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "font-medium text-lg mb-1 block",
        {
          "text-danger-300": error,
        },
        className
      )}
      {...otherProps}
    >
      {children}
    </label>
  );
}

export default InputLabel;
