import { getPaymentByTransactionIdUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { toast } from "sonner";

export function useGetPaymentByTransactionId() {
  const getPaymentByTransactionId = useCallback(
    async (transactionId: string) => {
      try {
        const response =
          await getPaymentByTransactionIdUseCase.execute(transactionId);
        return response;
      } catch (error) {
        toast.error("Gagal mengambil data SPP");
      }
    },
    [],
  );
  return { getPaymentByTransactionId };
}
