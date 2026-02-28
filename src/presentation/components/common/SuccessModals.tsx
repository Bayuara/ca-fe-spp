import Modals from "./Modals";
import Button from "./Button";

interface ISuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  closable?: boolean;
  withButton?: boolean;
  textOnButton?: string;
}

function SuccessModals(props: ISuccessModalProps) {
  const {
    isOpen,
    onClose,
    title,
    description,
    closable,
    withButton,
    textOnButton,
  } = props;
  return (
    <Modals isOpen={isOpen} onClose={onClose} title={title} closable={closable}>
      <div className="flex flex-col items-center phone:py-4 py-8">
        <img
          src="/CheckCircle.svg"
          alt="Success"
          className="mb-4 size-52 tablet:size-48 phone:size-36"
        />
        <p className="text-gray-700 text-center phone:px-4 phone:text-sm text-lg font-semibold">
          {description ?? "Berhasil dilakukan"}
        </p>
      </div>
      <div className="flex justify-center mx-4 mb-3">
        {withButton ? (
          <Button onClick={onClose} block>
            {textOnButton ?? "OK"}
          </Button>
        ) : null}
      </div>
    </Modals>
  );
}

export default SuccessModals;
