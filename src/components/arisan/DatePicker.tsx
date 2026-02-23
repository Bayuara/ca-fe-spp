import { ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import InputLabel from "./InputLabel";
import { Calendar } from "../ui/calendar";
import { TTextFieldRounded } from "@/components/common/table/TextField";
import clsx from "clsx";
import { BsCalendar3 } from "react-icons/bs";
import { Control, Controller, useForm } from "react-hook-form";
import { CaptionLayout } from "react-day-picker";
import { dateFormat } from "@/utils/dateUtils";

interface IDatepickerProps {
  label: string;
  error: boolean;
  helperText: string;
  size: "sm" | "md";
  rounded: TTextFieldRounded;
  placeholder?: string;
  control?: Control;
  name?: string;
  navigation?: "dropdown" | "button";
  defaultValue?: string;
  disableDay?: (val: Date) => boolean;
  icon?: ReactNode;
  onChange?: (val: Date | undefined) => void;
}
function Datepicker(props: Partial<IDatepickerProps>) {
  const {
    label,
    error,
    size = "md",
    rounded = "2xl",
    placeholder,
    control: parentControl,
    name,
    helperText,
    navigation = "button",
    defaultValue,
    disableDay,
    icon,
    onChange: parentOnChange = () => {},
  } = props;

  const { control } = useForm();

  const [open, setOpen] = useState(false);

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

  const [value, setValue] = useState<Date | undefined>(() => {
    if (!defaultValue) return undefined;
    return new Date(defaultValue);
  });

  return (
    <div className="mb-3">
      {label ? <InputLabel error={error}>{label}</InputLabel> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={clsx(
              "w-full border bg-[#FFF] text-left flex justify-between items-center",
              { "text-gray-500": !value },
              roundStyle[rounded],
              sizeStyle[size],
              { "border-red-600 text-red-300": error }
            )}
          >
            {value
              ? dateFormat({ str: value.toISOString() })
              : placeholder ?? "Silahkan pilih tanggal"}
            {icon ?? <BsCalendar3 className="ml-auto h-4 w-4 opacity-50" />}
          </button>
        </PopoverTrigger>
        <Controller
          control={parentControl ?? control}
          name={name ?? ""}
          defaultValue={defaultValue ?? ""}
          render={({ field: { onChange } }) => {
            return (
              <>
                <PopoverContent className="w-auto p-0 bg-[#FFF]" align="start">
                  <Calendar
                    mode="single"
                    selected={value}
                    captionLayout={navigation as CaptionLayout}
                    onSelect={(val?: Date) => {
                      if (val) {
                        val.setHours(val.getHours() + 7);
                        onChange(val.toISOString().slice(0, 10));
                      }
                      setValue(val);
                      setOpen(false);
                      parentOnChange(val);
                    }}
                    fromYear={navigation === "dropdown" ? 1970 : undefined}
                    toYear={
                      navigation === "dropdown"
                        ? new Date().getFullYear()
                        : undefined
                    }
                    disabled={(date) => {
                      if (disableDay) {
                        return disableDay(date);
                      }
                      return date > new Date() || date < new Date("1900-01-01");
                    }}
                  />
                </PopoverContent>
              </>
            );
          }}
        />
        {error && helperText ? (
          <span className="text-red-50">{helperText}</span>
        ) : null}
      </Popover>
    </div>
  );
}

export default Datepicker;
