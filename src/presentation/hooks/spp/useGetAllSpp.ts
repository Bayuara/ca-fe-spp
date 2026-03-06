import { getAllSppUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { toast } from "sonner";

export function useGetAllSpp() {
  const getAllSpp = useCallback(async () => {
    try {
      const result = await getAllSppUseCase.execute();

      if (result.status !== "success") {
        toast.error(result.message || "Gagal mengambil data SPP");
        return [];
      }
      return result.data;
    } catch (error) {
      toast.error("Gagal mengambil data SPP");
      return [];
    }
  }, []);
  return { getAllSpp };
}
