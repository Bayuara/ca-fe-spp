import { useEffect, useState } from "react";
import Img from "../assets/forgetPasswordImg.png";
import { useLayout } from "@/components/hooks/useLayout";
import { toast } from "sonner";
import AuthService from "@/services/authServices";
import InputUserCode from "@/components/auth/InputUserCode";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import SuccessModals from "@/components/common/SuccessModals";

const ForgetPasswordUserCode = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setHideLayout } = useLayout();

  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (val: unknown) => {
    setLoading(true);
    try {
      // const response = await AuthService.forgotPassword(val);
      await AuthService.forgotPassword(val);
      // const { data, message } = response;
      // console.log("message Forgot Password API:", message);
      // console.log("data Forgot Password API:", data);
      setIsModalOpen(true);
    } catch (error) {
      // console.error("Error:", error);
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-putihNormal px-8">
      <div className="container flex flex-col laptop:flex-row laptop:justify-around items-center">
        <img src={Img} className="laptop:w-5/12 items-center" />
        <div className="laptop:w-5/12 items-center">
          <h1 className="text-kuningNormal text-4xl font-bold laptop:text-8xl my-4">
            Lupa Kata Sandi?
          </h1>
          <p>
            Masukkan kode pengguna yang telah terdaftar untuk mengatur ulang
            kata sandi anda.
          </p>
          <div className="my-6">
            <InputUserCode onSubmit={handleSubmit} isLoading={loading} />
            <Button
              onClick={() => navigate("/login")}
              className="w-11/12"
              rounded="2xl"
              variant="outline"
              block
              disabled={loading}
            >
              Kembali
            </Button>
          </div>
        </div>
      </div>
      <SuccessModals
        isOpen={isModalOpen}
        onClose={() => navigate("/login")}
        closable
        description="Silakan Cek Email Anda Untuk Mengubah Kata Sandi."
        withButton
      />
    </div>
  );
};

export default ForgetPasswordUserCode;
