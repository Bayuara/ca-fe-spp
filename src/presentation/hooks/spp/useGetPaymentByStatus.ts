import { getPaymentByStatusUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { toast } from "sonner";

export function useGetpaymentByStatus() {
  const getPaymentByStatus = useCallback(async (statusPaymentId: number) => {
    try {
      const response = await getPaymentByStatusUseCase.execute(statusPaymentId);
      return response;
    } catch (error) {
      toast.error("Gagal mengambil data SPP");
    }
  }, []);
  return { getPaymentByStatus };
}
