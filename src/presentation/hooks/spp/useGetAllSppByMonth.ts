import { getAllSppByMonthUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { toast } from "sonner";

export function useGetAllSppByMonth() {
  const getAllSppByMonth = useCallback(async () => {
    try {
      const response = await getAllSppByMonthUseCase.execute();
      if (response.status !== "success") {
        toast.error(response.message || "Gagal mengambil data SPP");
        return [];
      }
      return response.data;
    } catch (error) {
      toast.error("Gagal mengambil data SPP");
      return [];
    }
  }, []);

  return { getAllSppByMonth };
}
