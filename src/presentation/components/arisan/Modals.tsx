import { ReactNode } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { FiX } from "react-icons/fi";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface IModalProps {
  open: boolean;
  children: ReactNode;
  title: string;
  onClose?: () => void;
  size?: ModalSize;
}

function Modal(props: Partial<IModalProps>) {
  const { open, children, title, onClose, size = "2xl" } = props;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent size={size} className="bg-[#FFF] p-0 rounded-lg">
        <div className="relative">
          {title ? (
            <div className="bg-kuningNormal rounded-lg p-2 text-putihLightActive text-center border border-hijauNormal">
              {title}
            </div>
          ) : null}
          <VisuallyHidden.Root>
            <AlertDialogTitle />
          </VisuallyHidden.Root>

          {onClose ? (
            <div className="absolute right-4 top-2.5">
              <button onClick={onClose}>
                <FiX />
              </button>
            </div>
          ) : null}
          <div className="p-4">{children}</div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Modal;
