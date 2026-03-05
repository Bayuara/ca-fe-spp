import { getAllWaitingSppUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { toast } from "sonner";

export function useGetAllWaitingSpp() {
  const getAllWaitingSpp = useCallback(async () => {
    try {
      const result = await getAllWaitingSppUseCase.execute();

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

  return { getAllWaitingSpp };
}
