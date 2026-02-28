import { capitalizeFirstLetter } from "@/utils/stringUtils";
import { useAuth } from "@/presentation/components/hooks/useAuth";

const Greetings = () => {
  const { user } = useAuth();

  return (
    <h1 className="text-[90px] tablet:text-[64px] phone:text-[44px] font-bold text-[#FBC619] leading-none">
      Hallo{" "}
      {user?.userDetail?.nickname
        ? capitalizeFirstLetter(user?.userDetail?.nickname)
        : "Siswa"}
      !
    </h1>
  );
};

export default Greetings;
