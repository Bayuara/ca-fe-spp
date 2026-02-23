import { useEffect, useState } from "react";
import { toast } from "sonner";
import AuthService from "@/services/authServices";
import { useNavigate } from "react-router-dom";
import Img from "../assets/forgetPasswordImg.png";
import { useLayout } from "@/components/hooks/useLayout";
import { useSearchParams } from "react-router-dom";
import ForgetPassword from "@/components/auth/ForgetPassword";
import SuccessModals from "@/components/common/SuccessModals";

const ForgetPasswordChangePassword = () => {
  const [searchParams] = useSearchParams();
  const [isModalopen, setIsModalOpen] = useState(false);
  const accessToken = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setHideLayout } = useLayout();

  // Simpan token ke localStorage saat komponen di-render
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      // console.log("Token saved to localStorage:", accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePassword = async (val: unknown) => {
    setIsLoading(true);
    try {
      // const response = await AuthService.changePassword(val);
      await AuthService.changePassword(val);
      // const { data, message } = response;
      // console.log("message Change Password API:", message);
      // console.log("data Change Password API:", data);
      localStorage.removeItem("accessToken");

      toast.success("Password Berhasil Diganti!");
      // Programmatic approach imperative
      setTimeout(() => setIsModalOpen(true), 500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.error("Error changing password:", error);
      toast.error(`Gagal Mengganti Password: ${error}`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-putihNormal py-8 px-4 tablet:px-6 laptop:px-8 min-h-screen flex flex-col justify-center items-center">
      <div className="container flex flex-col laptop:flex-row items-center justify-center space-y-4 laptop:space-y-0">
        {/* Left side image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={Img}
            alt="Forget Password"
            className="w-full tablet:w-6/12 laptop:w-10/12 h-auto"
          />
        </div>

        {/* Right side form */}
        <div className="flex-1 w-full flex flex-col items-center laptop:items-start text-center laptop:text-left px-8 tablet:px-0">
          <div className="flex flex-col gap-3 mb-8">
            <h1 className="text-kuningNormal text-4xl phone:text-3xl tablet:text-5xl laptop:text-7xl font-bold">
              Ubah Kata Sandi
            </h1>
            <p className="text-xs tablet:text-sm laptop:text-lg">
              Kata sandi harus minimal 8 karakter, dengan huruf besar, kecil,
              dan angka.
            </p>
          </div>
          <ForgetPassword
            isLoading={isLoading}
            onSuccessChangePassword={handleChangePassword}
          />
        </div>
      </div>

      <SuccessModals
        isOpen={isModalopen}
        onClose={() => navigate("/login")}
        closable
        description="Selamat Kata Sandi Anda Berhasil diubah."
        withButton
        textOnButton="Masuk"
      />
    </div>
  );
};

export default ForgetPasswordChangePassword;
