import { Spp, SppPrint } from "../entities/Spp";

export type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

export interface SppRepository {
  getAllSpp(): Promise<ApiResponse<SppPrint[]>>;
  getAllSppByMonth(): Promise<ApiResponse<SppPrint[]>>;
  getAllWaitingSpp(): Promise<ApiResponse<SppPrint[]>>;
  getPaymentByStatus(statusPaymentId: number): Promise<ApiResponse<Spp[]>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPaymentByTransactionId(transactionId: string): Promise<ApiResponse<any>>;
  cancelPayment(transactionId: string): Promise<ApiResponse<SppPrint[]>>;
  gets(payload?: unknown): Promise<ApiResponse<SppPrint[]>>;
  getById(id: number): Promise<ApiResponse<SppPrint[]>>;
  getByIdBlob(id: string): Promise<Blob>;
  getQrisImg(payload?: unknown): Promise<ApiResponse<unknown>>;
  submitPayment(url: string, body: object): Promise<ApiResponse<SppPrint[]>>;
}
