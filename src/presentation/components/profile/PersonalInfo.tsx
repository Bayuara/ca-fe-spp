import React from "react";
import { IconType } from "react-icons"; // Adjust according to the icon library used

interface PersonalInfoProps {
  icon?: IconType;
  label: string;
  value: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center my-3 gap-2">
      {Icon && <Icon className="text-2xl text-kuningNormal" />}
      <label className="text-hitamNormal flex w-full text-sm tablet:text-lg laptop:text-2xl font-normal py-0.5">
        {label}
        <p className="text-hitamLightActive text-sm tablet:text-lg laptop:text-2xl font-normal pl-4">
          {value}
        </p>
      </label>
    </div>
  );
};

export default PersonalInfo;
