import { useAuth } from "@/components/hooks/useAuth";
import { logoutUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IUseLogout {
  setLoading: (val: boolean) => void;
}

export function useLogout({ setLoading }: IUseLogout) {
  const { onLogOut, refreshToken } = useAuth();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutUseCase.execute({ refreshToken });
      onLogOut();
      navigate("/login");
      toast.info("Logout Berhasil!");
    } catch (error) {
      toast.error("Logout Gagal");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLogOut]);

  return { logout };
}
