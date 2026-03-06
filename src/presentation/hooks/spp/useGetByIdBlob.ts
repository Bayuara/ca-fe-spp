import { getByIdBlobUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { toast } from "sonner";

export function useGetByIdBlob() {
  const getByIdBlob = useCallback(async (id: number) => {
    try {
      const response = await getByIdBlobUseCase.execute(id);
      if (!response) {
        toast.error("Gagal mengambil data SPP");
        // return null;
      }

      return response;
    } catch (error) {
      toast.error("Gagal mengambil data SPP");
    }
  }, []);
  return { getByIdBlob };
}
