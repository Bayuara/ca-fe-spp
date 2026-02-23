import { useAuth } from "@/components/hooks/useAuth";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
// import Logo from "../../assets/Logo.svg";
import ArisanService from "@/services/arisanServices";
import { capitalizeEachWord } from "@/utils/stringUtils";

interface IHeaderPrintProps extends React.HtmlHTMLAttributes<HTMLElement> {}

function HeaderPrint(props: IHeaderPrintProps) {
  const { className, ...otherProps } = props;

  const { user } = useAuth();

  const [frontendUrl, setFrontendUrl] = useState("");

  const userLogo = user?.customer.logo;
  const userName = user?.customer.name.toUpperCase();
  const userAddress = user?.customer.address;
  const userPhoneNumber = user?.customer.phoneNumber;

  useEffect(() => {
    const fetchData = async () => {
      const result = await ArisanService.getUrl();
      setFrontendUrl(result.data.url);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={clsx(
        "flex gap-4 items-center pb-2 border-b border-gray-600",
        className
      )}
      {...otherProps}
    >
      <img
        src={
          userLogo
            ? `${import.meta.env.VITE_BASE_URL}${user?.customer.logo}`
            : "Logo.svg"
        }
        className="size-36 object-contain mb-2"
      />
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-xl">
          {userName ? userName.toUpperCase() : "SPPKu"}
        </h1>
        <p>
          {userAddress
            ? capitalizeEachWord(userAddress)
            : "Jl.Raya Telukjambe, Depan Perum Permata Hijau, Sukagalih, Telukjambe Timur, Karawang"}
        </p>
        <p>Telepon: {userPhoneNumber ? userPhoneNumber : "0856 9298 7957"}</p>
        <p>Laman: {frontendUrl}</p>
      </div>
    </header>
  );
}

export default HeaderPrint;
