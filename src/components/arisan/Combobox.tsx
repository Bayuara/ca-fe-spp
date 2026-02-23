import { ReactNode, useEffect, useRef, useState } from "react";
import InputLabel from "./InputLabel";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import clsx from "clsx";
import { RxCaretSort, RxCheck } from "react-icons/rx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Control, Controller, useForm } from "react-hook-form";
import { TTextFieldRounded } from "@/components/common/table/TextField";

interface IDropdownProps<T> {
  options?: T[];
  getOptionLabel: (opt: T) => string;
  fetchData?: (searchText: string) => Promise<T[]>;
  showSearchbar?: boolean;
  getOptionValue: (opt: T) => string | number;
  label?: string;
  className?: string;
  onChange?: (opt?: T) => void;
  error?: boolean;
  helperText?: string;
  defaultValue?: T;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  placeholder?: string;
  size?: "sm" | "md";
  rounded?: TTextFieldRounded;
  icon?: ReactNode;
}

function Combobox<T>(props: IDropdownProps<T>) {
  const {
    getOptionLabel,
    options,
    getOptionValue,
    label,
    className,
    onChange,
    error,
    helperText,
    defaultValue,
    name,
    control: parentControl,
    placeholder,
    size = "md",
    rounded = "2xl",
    icon,
  } = props;

  const { control } = useForm();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<T | undefined>(defaultValue);
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  useEffect(() => {
    setData(options ?? []);
  }, [options]);

  const isCurrentValue = (item: T) => {
    if (!value) return false;

    return getOptionValue(item) === getOptionValue(value);
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeStyle = {
    sm: "py-1 px-2",
    md: "py-3 px-2",
  };

  const roundStyle = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  return (
    <div className="mb-4" ref={containerRef}>
      {label ? <InputLabel error={error}>{label}</InputLabel> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={buttonRef}
            role="combobox"
            aria-expanded={open}
            className={clsx(
              "justify-between flex items-center border border-black w-full bg-[#FFF]",
              { "border-red-300 text-red-300": error },
              roundStyle[rounded],
              sizeStyle[size],
              className
            )}
          >
            {value ? getOptionLabel(value) : placeholder ?? "Pilih salah satu"}
            {icon ?? (
              <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </button>
        </PopoverTrigger>

        <Controller
          control={parentControl ?? control}
          name={name ?? ""}
          defaultValue={defaultValue ? getOptionValue(defaultValue) : ""}
          render={({ field: { onChange } }) => {
            return (
              <>
                <PopoverContent
                  align="start"
                  style={{ width: buttonRef?.current?.clientWidth }}
                  className="p-0"
                  container={containerRef.current}
                >
                  <Command className="bg-white-300">
                    <CommandInput className="h-9" placeholder="Search..." />
                    <CommandList>
                      <CommandGroup>
                        <CommandEmpty>No results found.</CommandEmpty>
                        {data.map((item) => (
                          <CommandItem
                            key={getOptionValue(item)}
                            value={getOptionValue(item).toString()}
                            onSelect={() => {
                              const isValue = isCurrentValue(item);
                              setValue(isValue ? undefined : item);
                              if (isValue) {
                                onChange(undefined);
                              } else {
                                onChange(getOptionValue(item));
                              }
                              setOpen(false);
                            }}
                            className="hover:bg-primary-300"
                          >
                            {isCurrentValue(item) ? <RxCheck /> : null}
                            {getOptionLabel(item)}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </>
            );
          }}
        />
      </Popover>

      {helperText ? (
        <p className={clsx({ "text-danger-300": error })}>{helperText}</p>
      ) : null}
    </div>
  );
}

export default Combobox;
