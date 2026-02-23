import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../common/Button";
import Profile from "../../home/Profile";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import Logo from "@/components/common/Logo";

const navbarButtons = [
  { rute: "/", title: "Beranda" },
  { rute: "/spp", title: "Pembayaran SPP" },
  { rute: "/feedback", title: "Ulasan" },
];

const NavigationBar: React.FC = () => {
  const [isSidebarMenuOpen, setSidebarMenuOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setSidebarMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarMenuOpen]);

  return (
    <nav className="bg-putihNormal py-4 px-8 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Button and Logo for mobile view */}
        <div className="flex items-center justify-between w-full laptop:hidden">
          <button
            className="block laptop:hidden"
            onClick={() => setSidebarMenuOpen(!isSidebarMenuOpen)}
          >
            {isSidebarMenuOpen ? (
              <RxCross1 size={25} className="size-25 hidden" />
            ) : (
              <RxHamburgerMenu size={25} className="size-25" />
            )}
          </button>
          {/* <img
            className="size-12 tablet:size-14 laptop:size-16 bg-none mx-auto"
            src={logo}
            alt="Logo"
          /> */}
          <Logo />
          <div className="block laptop:hidden">
            <Profile />
          </div>
        </div>

        {/* Navigation links for desktop view */}
        <div className="hidden laptop:flex items-center justify-between w-full">
          <div className="h-20 p-2 flex items-center gap-2">
            {/* <img className="w-16 h-16 bg-none" src={logo} alt="Logo" /> */}
            <Logo />
          </div>
          <div className="flex justify-evenly grow">
            {navbarButtons.map((button) => (
              <NavLink key={button.rute} to={button.rute}>
                {({ isActive }) => (
                  <Button
                    className="w-60"
                    rounded="full"
                    variant={isActive ? "default" : "outline"}
                    // isActive={isActive}
                  >
                    {button.title}
                  </Button>
                )}
              </NavLink>
            ))}
          </div>
          <div className="w-50 h-20 flex items-center justify-center mr-8">
            <Profile />
          </div>
        </div>

        {/* Mobile Navigation links */}
        {isSidebarMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
            <div
              ref={sidebarRef}
              className="flex flex-col items-center laptop:hidden absolute top-0 left-1/2 transform -translate-x-1/2 w-full border-2 border-hijauNormal bg-white z-10 rounded-b-xl"
            >
              <div className="w-full flex items-center justify-between p-4 pb-2">
                <button onClick={() => setSidebarMenuOpen(false)}>
                  <RxCross1 className="absolute left-5 top-6 size-8" />
                </button>
                {/* <img
                  className="size-12 bg-none mx-auto object-cover"
                  src={logo}
                  alt="Logo"
                /> */}
                <Logo className="mx-auto object-cover" />
              </div>
              <div className="flex flex-col items-center w-full">
                {navbarButtons.map((button) => (
                  <NavLink
                    key={button.rute}
                    to={button.rute}
                    className="w-full"
                  >
                    {({ isActive }) => (
                      <Button
                        className="border-none py-4"
                        rounded="none"
                        variant={isActive ? "default" : "outline"}
                        // isActive={isActive}
                        onClick={() => setSidebarMenuOpen(!isSidebarMenuOpen)}
                        block
                      >
                        {button.title}
                      </Button>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
