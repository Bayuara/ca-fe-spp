/**
 * Presentation Hook - useResetPassword
 * Menghubungkan UI dengan use case (Clean Architecture)
 */

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPasswordUseCase } from "@/infrastructure/container";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export function useResetPassword() {
  const navigate = useNavigate();

  const resetPassword = useCallback(
    async (data: ResetPasswordFormData) => {
      const token = localStorage.getItem("refreshToken");
      const result = await resetPasswordUseCase.execute({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (result.success) {
        localStorage.removeItem("accessToken");
        toast.success("Password Berhasil Diganti!");
        setTimeout(() => navigate("/login"), 750);
        return;
      }

      throw new Error(result.message || "Gagal reset password");
    },
    [navigate]
  );

  return { resetPassword };
}
