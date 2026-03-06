import {
  ApiResponse,
  SppRepository,
} from "@/domain/repositories/spp.repository";
import { ApiClient, generateSearchParams } from "../api/apiClient";
import { Spp, SppPrint } from "@/domain/entities/Spp";

export class SppRepositoryImpl implements SppRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async cancelPayment(transactionId: string): Promise<ApiResponse<SppPrint[]>> {
    return this.apiClient.request("payment/payment-cancel", "POST", {
      transactionId: transactionId,
    });
  }

  async getAllSpp(): Promise<ApiResponse<SppPrint[]>> {
    return this.apiClient.request("payment/payment-history", "GET");
  }

  async getAllSppByMonth(): Promise<ApiResponse<SppPrint[]>> {
    return this.apiClient.request(
      "payment/payment-history?orderBy=month-asc&limit=6",
      "GET",
    );
  }

  async getAllWaitingSpp(): Promise<ApiResponse<SppPrint[]>> {
    return this.apiClient.request("payment/payment-pending", "GET");
  }

  async getById(id: number): Promise<ApiResponse<SppPrint[]>> {
    return this.apiClient.request("payment/" + id, "GET");
  }

  async getByIdBlob(id: number): Promise<Blob> {
    return this.apiClient.requestBlob("payment/" + id, "GET");
  }

  async getPaymentByStatus(
    statusPaymentId: number,
  ): Promise<ApiResponse<Spp[]>> {
    return this.apiClient.request(
      `payment/payment-history?statusPaymentId=${statusPaymentId}`,
      "GET",
    );
  }

  async getPaymentByTransactionId(
    transactionId: string,
  ): Promise<ApiResponse<unknown>> {
    return this.apiClient.request(
      "payment/transaction/" + transactionId,
      "GET",
    );
  }

  async getQrisImg(payload?: unknown): Promise<ApiResponse<unknown>> {
    return this.apiClient.request("payment/qris", "POST", payload);
  }

  async gets(payload?: unknown): Promise<ApiResponse<SppPrint[]>> {
    return this.apiClient.request(
      "payment/payment-history?orderBy=year-asc&orderBy=month-desc&" +
        generateSearchParams(payload as object),
      "GET",
    );
  }

  async submitPayment(
    url: string,
    body: object,
  ): Promise<ApiResponse<SppPrint[]>> {
    return this.apiClient.request(url, "POST", body);
  }
}
