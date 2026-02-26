import React, { useEffect, useState } from "react";
import rightImage from "../assets/img-front.png"; // Placeholder for the right-side image
import LoginForm from "../components/auth/LoginForm"; // Mengimpor komponen Form
import ChangePasswordForm from "../components/auth/ChangePasswordForm";
import Modals from "../components/common/Modals"; // Mengimpor komponen Modals
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/authServices";
import { toast } from "sonner";
import { useLayout } from "@/components/hooks/useLayout";
import Logo from "@/components/common/Logo";
import { useLogin } from "@/presentation/hooks/useLogin";

const LoginPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { onLogIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setHideLayout } = useLayout();

  const { login } = useLogin({
    onPasswordChangeRequired: () => setIsModalOpen(true),
    setLoading,
  });

  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (val: { userCode: string; password: string }) => {
    const { userCode, password } = val;
    await login(userCode, password);
  };

  // const handleLogin = async (val: unknown) => {
  //   setLoading(true);
  //   try {
  //     const response = await AuthService.login(val);
  //     const { data } = response;

  //     const { accessToken, refreshToken, isPasswordChangeRequired } = data;

  //     onLogIn({
  //       // user, // Add the user object here
  //       accessToken,
  //       refreshToken,
  //     });

  //     toast.success("Login Berhasil!");

  //     if (isPasswordChangeRequired) {
  //       toast.info("Mohon ganti Password!");
  //       setIsModalOpen(true);
  //       setLoading(false);
  //     } else {
  //       setTimeout(() => navigate("/"), 500);
  //     }

  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     const err = error as Error;
  //     toast.error(err.message);
  //     // console.log(`error catch:${err.message}`);
  //     setLoading(false);
  //   }
  // };

  const handleChangePassword = async (val: unknown) => {
    setLoading(true);
    try {
      await AuthService.changePassword(val);
      // const response = await AuthService.changePassword(val);
      // const { data, message } = response;
      // console.log("message Change Password API:", message);
      // console.log("data Change Password API:", data);

      toast.success("Password Berhasil Diganti!");
      // Programmatic approach imperative
      setTimeout(() => navigate("/"), 500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.error("Error changing password:", error);
      toast.error(`Gagal Mengganti Password: ${error.response.data.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col laptop:flex-row items-center bg-putihNormal">
      <nav className="laptop:absolute top-0 left-0 w-full py-4 px-8">
        <div className="container flex justify-start items-center">
          <Logo />
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="laptop:ml-20 mt-4 m-2 mb-4 laptop:mt-20 ">
          {/* gambar tablet, mobile */}
          <div className="flex-1 flex items-center text-center justify-center laptop:hidden">
            <img
              src={rightImage}
              alt="Illustration"
              className="size-9/12 h-auto"
            />
          </div>
          {/* gambar tablet, mobile end */}
          <h1 className="phone:text-3xl text-6xl text-hijauNormal font-bold my-4 md:my-2">
            Selamat Datang Di <span className="text-merahNormal">SPPKu</span>
          </h1>
          <p className="mb-6 md:mb-12 text-lg laptop:text-3xl tablet:text-2xl">
            Layanan Mudah Untuk Pembayaran Uang Sekolah Anda
          </p>
          <LoginForm isLoading={loading} onSubmit={handleLogin} />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img
          src={rightImage}
          alt="Illustration"
          className="tablet:hidden phone:hidden block w-5/6 h-auto"
        />
      </div>
      <Modals
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closable
        size="2xl"
        title="Mohon buat kata sandi untuk mengamankan akun Anda!"
      >
        <div className="p-8 pt-6 phone:px-4">
          <div className="space-y-2">
            <ChangePasswordForm
              isLoading={loading}
              onSuccessChangePassword={handleChangePassword}
            />
          </div>
        </div>
      </Modals>
    </div>
  );
};

export default LoginPage;
