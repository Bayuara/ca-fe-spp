import clsx from "clsx";

interface ILogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Logo = (props: ILogoProps) => {
  const { className } = props;
  return (
    <img
      //   src="/Logo.svg"
      src="/Logo.svg"
      alt="Logo"
      className={clsx(className, "size-12 tablet:size-14 laptop:size-16")}
    />
  );
};

export default Logo;
