/**
 * Presentation Hook - useProfile
 * Menghubungkan UI dengan use case (Clean Architecture)
 */

import { useCallback } from "react";
import { toast } from "sonner";
import { changeProfileUseCase } from "@/infrastructure/container";
import { useAuth } from "@/presentation/components/hooks/useAuth";

export function useProfile() {
  const { refetch } = useAuth();

  const changeProfile = useCallback(
    async (email: string, phoneNumber: string) => {
      try {
        const result = await changeProfileUseCase.execute({
          email,
          phoneNumber,
        });

        if (result.message) {
          toast.success(
            result.message || "Informasi profil berhasil diperbarui.",
          );
          refetch();
          return true;
        }
        return false;
      } catch (error) {
        toast.error("Error saat memperbarui profile: " + error);
        return false;
      } finally {
        refetch();
      }
    },
    [refetch],
  );

  return { changeProfile };
}
