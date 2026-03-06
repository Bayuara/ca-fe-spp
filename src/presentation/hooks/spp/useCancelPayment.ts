import { cancelPaymentUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { toast } from "sonner";

export function useCancelPayment() {
  const cancelPayment = useCallback(async (transactionId: string) => {
    try {
      const result = await cancelPaymentUseCase.execute(transactionId);

      if (!result.data) {
        toast.error(result.message || "Gagal membatalkan transaksi");
        // return false;
      }

      toast.success(result.message);
      return result;
    } catch (error) {
      toast.error("Terjadi kesalahan saat membatalkan transaksi");
      console.error(error);
      // return error;
      // throw error;
    }
  }, []);
  return { cancelPayment };
}
