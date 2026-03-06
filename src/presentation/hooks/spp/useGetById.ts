import { getByIdUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { toast } from "sonner";

export function useGetById() {
  const getById = useCallback(async (id: number) => {
    try {
      const response = await getByIdUseCase.execute(id);
      if (response.status !== "success") {
        toast.error(response.message || "Gagal mengambil data SPP");
        // return null;
      }
      return response.data;
    } catch (error) {
      toast.error("Gagal mengambil data SPP");
      // return null;
    }
  }, []);

  return { getById };
}
