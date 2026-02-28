import Modals from "./Modals";
import Button from "./Button";
import { ReactNode } from "react";

export type ConfirmationModalResult = { confirmed: boolean };

interface IConfirmationModals {
  isOpen: boolean;
  onClose: (val: ConfirmationModalResult) => void;
  title?: string;
  description?: string;
  closable?: boolean;
  confirmtext?: string;
  cancelText?: string;
  isLoading?: boolean;
  imageModals?: ReactNode;
}

function ConfirmationModals(props: IConfirmationModals) {
  const {
    isOpen,
    onClose,
    title,
    description,
    closable,
    confirmtext,
    cancelText,
    isLoading,
    imageModals,
  } = props;

  return (
    <Modals
      isOpen={isOpen}
      onClose={() => onClose({ confirmed: false })}
      closable={closable}
      title={title}
    >
      <div className="flex flex-col items-center p-4 px-4">
        {/* Kondisional untuk imageModals dengan className yang konsisten */}
        <div className="text-center justify-center items-center size-48 tablet:size-36 phone:size-24 bg-none object-contain">
          {imageModals ? (
            imageModals
          ) : (
            <img
              src="/orangBingung.svg"
              alt="Wondering-person"
              className="object-contain"
            />
          )}
        </div>
        <p className="text-gray-700 text-center text-sm tablet:text-lg laptop:text-xl font-semibold">
          {description ?? "Apakah Kamu Yakin?"}
        </p>
      </div>
      <div className="flex justify-center space-x-6 phone:space-x-2 w-full pb-4">
        <Button
          onClick={() => onClose({ confirmed: true })}
          isLoading={isLoading}
          disabled={isLoading}
          className="w-5/12"
          rounded="2xl"
        >
          {confirmtext ?? "Yakin"}
        </Button>
        <Button
          onClick={() => onClose({ confirmed: false })}
          variant="danger"
          disabled={isLoading}
          className="w-5/12"
          rounded="2xl"
        >
          {cancelText ?? "Tidak"}
        </Button>
      </div>
    </Modals>
  );
}

export default ConfirmationModals;
