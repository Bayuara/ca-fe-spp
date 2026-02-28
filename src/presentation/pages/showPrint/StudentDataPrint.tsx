import { useAuth } from "@/presentation/components/hooks/useAuth";
import { capitalizeEachWord } from "@/utils/stringUtils";
import clsx from "clsx";

interface IStudentDataPrint extends React.HtmlHTMLAttributes<HTMLElement> {}

function StudentDataPrint(props: IStudentDataPrint) {
  const { user } = useAuth();
  const { className, ...otherProps } = props;
  return (
    <div className={clsx(className)} {...otherProps}>
      <h2 className="phone:text-sm text-xl font-bold border-b pb-4 border-gray-800">
        A. Data Siswa
      </h2>
      <div className="w-full flex phone:text-xs text-lg phone:space-y-0 phone:py-1">
        <div className="w-1/5 py-2 space-y-3 phone:w-2/5">
          <p className="font-normal">NISN</p>
          <p className="font-normal">Nama Lengkap</p>
          <p className="font-normal">Kelas</p>
          <p className="font-normal">Kategori Siswa</p>
        </div>
        <div className="w-4/5 py-2 space-y-3 phone:w-3/5">
          <p className="font-normal">
            : {capitalizeEachWord(user?.userDetail?.nisn || "N/A")}
          </p>
          <p className="font-normal">
            : {capitalizeEachWord(user?.name || "N/A")}
          </p>
          <p className="font-normal">
            : {user?.userDetail?.class?.name?.toUpperCase() || "N/A"}
          </p>
          <p className="font-normal">
            : {user?.userDetail?.userCategory?.name || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentDataPrint;
