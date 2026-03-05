import { getsUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { SppPrint } from "@/services/types/spp";
import { toast } from "sonner";

export function useGets() {
  const gets = useCallback(async (): Promise<SppPrint[]> => {
    try {
      const result = await getsUseCase.execute();

      if (result.status !== "success") {
        toast.error(result.message || "Gagal mengambil data SPP");
        return [];
      }

      return result.data;
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengambil data SPP");
      console.error(error);
      return [];
    }
  }, []);

  return { gets };
}
