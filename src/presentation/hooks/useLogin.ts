import { useAuth } from "@/components/hooks/useAuth";
import { loginUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IUseLogin {
  onPasswordChangeRequired: () => void;
  setLoading: (val: boolean) => void;
}

export function useLogin({ onPasswordChangeRequired, setLoading }: IUseLogin) {
  const { onLogIn } = useAuth();
  const navigate = useNavigate();

  const login = useCallback(
    async (userCode: string, password: string) => {
      try {
        const result = await loginUseCase.execute({ userCode, password });

        const { data, message } = result;

        onLogIn({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        toast.success(message || "Login Berhasil!");

        if (data.isPasswordChangeRequired) {
          toast.info("Mohon ganti Password!");
          onPasswordChangeRequired();
        } else {
          setTimeout(() => navigate("/"), 500);
        }
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
        // toast.error("Login Gagal: " + error);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onLogIn],
  );

  return { login };
}
