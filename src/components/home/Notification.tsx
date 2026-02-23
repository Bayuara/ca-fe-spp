import React from "react";

interface NotificationProps {
  message: string;
  linkText: string;
  linkHref: string;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  linkText,
  linkHref,
}) => {
  return (
    <div className="bg-merahNormal text-white text-start tablet:text-sm laptop:text-lg p-3 ml-12 mr-20 my-0 rounded-lg flex justify-center items-center tablet:mx-8 tablet:text-start phone:mx-8 phone:text-[10px] phone:text-start">
      <span className="font-poppins font-bold">{message}</span>
      <a
        href={linkHref}
        className="underline ml-2 font-poppins font-bold text-kuningNormal"
      >
        {linkText}
      </a>
    </div>
  );
};

export default Notification;
