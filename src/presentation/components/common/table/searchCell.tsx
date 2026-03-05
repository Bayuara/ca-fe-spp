import { FiSearch } from "react-icons/fi";
import TextField from "./TextField";
import { Column } from "@tanstack/react-table";
import { ChangeEvent, useEffect, useState } from "react";

interface ISearchCellProps<TData>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  column: Column<TData>;
}

function SearchCell<TData>(props: ISearchCellProps<TData>) {
  const { placeholder, column, ...otherProps } = props;
  const [value, setValue] = useState(column.getFilterValue() as string);

  useEffect(() => {
    const x = setTimeout(() => {
      column.setFilterValue(value);
    }, 1000);

    return () => {
      clearTimeout(x);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <TextField
      placeholder={placeholder}
      inputSize="sm"
      className="bg-[#FFF] min-w-24"

      suffix={<FiSearch className="text-[#7A7A7A] w-4 h-4 phone:size-3" />}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      {...otherProps}
    />
  );
}

export default SearchCell;
