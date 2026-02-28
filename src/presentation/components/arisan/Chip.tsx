interface IChipProps {
  text: string;
  onClose?: () => void;
}

function Chip(props: IChipProps) {
  const { text, onClose } = props;

  return (
    <div className="bg-putihLightHover p-2 flex gap-2 rounded-lg shadow-sm border border-hijauLightHover items-center phone:py-1 phone:gap-1">
      <span className="text-hijauNormal font-semibold text-sm phone:text-[0.40rem]">
        {text}
      </span>
      <button onClick={onClose}>
        <span className="bg-hijauNormal rounded-full text-putihNormal py-1 px-2 text-xs block phone:px-[0.25rem] phone:py-0 phone:text-[0.40rem]">
          X
        </span>
      </button>
    </div>
  );
}

export default Chip;
