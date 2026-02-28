import logo from "../../assets/Logo.svg";
import { PiCalendarDots } from "react-icons/pi";
// import Button from "../common/Button";
// import { RxExit } from "react-icons/rx";

const Navbar = () => {
  const date = new Date();
  return (
    <>
      <nav className="flex justify-between items-center">
        <img src={logo} alt="" className="size-20 phone:size-16" />
        <div className="flex gap-2 items-center">
          <PiCalendarDots className="w-6 h-6 text-[#7A7A7A]" />
          <p className="text-[#7A7A7A] font-medium text-base lg:text-lg">
            {new Intl.DateTimeFormat("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(date)}
          </p>
        </div>
        {/* <Button
          variant="danger"
          iconPrefix={
            <RxExit className="size-4 tablet:size-5 laptop:size-6 mr-2 ml-1" />
          }
          className="px-8 pr-14"
        >
          Logout
        </Button> */}
      </nav>
    </>
  );
};

export default Navbar;
