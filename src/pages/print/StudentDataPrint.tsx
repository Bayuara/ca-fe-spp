import { useAuth } from "@/components/hooks/useAuth";
import { capitalizeEachWord } from "@/utils/stringUtils";
import clsx from "clsx";

interface IStudentDataPrint extends React.HtmlHTMLAttributes<HTMLElement> {}

function StudentDataPrint(props: IStudentDataPrint) {
  const { user } = useAuth();
  const { className, ...otherProps } = props;
  return (
    <div className={clsx(className)} {...otherProps}>
      <h2 className="text-xl font-bold border-b pb-4 border-gray-800">
        A. Data Siswa
      </h2>
      <div className="w-full flex space-y-3 py-2">
        <div className="w-1/5">
          <p className="text-lg font-normal">NISN</p>
          <p className="text-lg font-normal">Nama Lengkap</p>
          <p className="text-lg font-normal">Kelas</p>
          <p className="text-lg font-normal">Kategori Siswa</p>
        </div>
        <div className="w-4/5">
          <p className="text-lg font-normal">
            : {capitalizeEachWord(user?.userDetail?.nisn || "N/A")}
          </p>
          <p className="text-lg font-normal">
            : {capitalizeEachWord(user?.name || "N/A")}
          </p>
          <p className="text-lg font-normal">
            : {user?.userDetail?.class?.name?.toUpperCase() || "N/A"}
          </p>
          <p className="text-lg font-normal">
            : {user?.userDetail?.userCategory?.name || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentDataPrint;
