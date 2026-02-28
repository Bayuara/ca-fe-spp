import React from "react";
import logo from "../../assets/Logo.svg";
import WALogo from "../../assets/whatsapp.svg";
import MailLogo from "../../assets/gmail.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/presentation/components/ui/tooltip";

const Footer: React.FC = () => {
  return (
    <footer className="bg-putihNormal p-6 pt-0">
      <div className="container mx-auto flex justify-between phone:justify-around items-center">
        <div className=" ml-1 grid grid-cols-2 justify-center items-center place-content-center place-items-center">
          <img
            className="size-10 laptop:size-16 bg-none"
            src={logo}
            alt="Logo"
          />
          <div>
            <p className="font-poppins font-semibold text-sm laptop:text-base">
              Kontak Kami:
            </p>
            <div className="flex space-x-5">
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={WALogo}
                  alt="WhatsApp"
                  className="size-6.5 laptop:size-8 mb-1 bg-none"
                />
              </a>
              <a href="mailto:your-email@example.com">
                <img
                  src={MailLogo}
                  alt="Email"
                  className="size-6.5 laptop:size-8 mb-1 bg-none"
                />
              </a>
            </div>
          </div>
          <div className="col-span-2">
            <p className="font-poppins text-xs ml-2">
              Created by
              <span className="font-semibold"> Magang Karib 2024</span>
            </p>
          </div>
        </div>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger>
              <button className="bg-gray-400 text-white p-2 rounded-lg laptop:mr-14 cursor-default">
                Live Chat
              </button>
            </TooltipTrigger>
            <TooltipContent align="center" sideOffset={5}>
              <p>On Going</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  );
};

export default Footer;
