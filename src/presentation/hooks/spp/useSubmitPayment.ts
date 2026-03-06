import { submitPaymentUseCase } from "@/infrastructure/container";
import { useCallback } from "react";
import { toast } from "sonner";

export function useSubmitPayment() {
  const submitPayment = useCallback(async (url: string, body: object) => {
    try {
      const response = await submitPaymentUseCase.execute(url, body);
      toast.success(response.message || "Pembayaran berhasil");
      return response;
    } catch (error) {
      toast.error("Gagal mengirim pembayaran");
    }
  }, []);
  return { submitPayment };
}
