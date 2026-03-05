/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchBlob,
  fetchData,
  generateSearchParams,
} from "../utils/api";
import { Spp, SppPrint } from "./types/spp";

export default class SppService {
  static async getAllSpp() {
    return fetchData<SppPrint[]>("payment/payment-history", "GET");
  }
  static async getAllSppByMonth() {
    return fetchData<SppPrint[]>(
      "payment/payment-history?orderBy=month-asc&limit=6",
      "GET",
    );
  }

  static async getAllWaitingSpp() {
    return fetchData<SppPrint[]>("payment/payment-pending", "GET");
  }

  static async getPaymentByStatus(statusPaymentId: number) {
    return fetchData<Spp[]>(
      `payment/payment-history?statusPaymentId=${statusPaymentId}`,
      "GET",
    );
  }

  static async getPaymentByTransactionId(transactionId: string) {
    const { data, message, status, totalAmount } = await fetchData<any>(
      "payment/transaction/" + transactionId,
      "GET",
    );

    // Spread the properties from data array and merge it with the totalAmount
    const paymentDetails = data.map((payment: any) => ({
      ...payment,
      totalAmount,
    }));

    return {
      message,
      status,
      data: paymentDetails as SppPrint,
    };
  }

  static async cancelPayment(transactionId: string) {
    return fetchData<SppPrint[]>("payment/payment-cancel", "POST", {
      transactionId: transactionId,
    });
  }

  static async gets(payload?: unknown) {
    return fetchData<SppPrint[]>(
      "payment/payment-history?orderBy=year-asc&orderBy=month-asc&" +
        generateSearchParams(payload as object),
      "GET",
    );
  }
  static async getById(id: number) {
    return fetchData<SppPrint>("payment/" + id, "GET");
  }

  static async getByIdBlob(id: string): Promise<Blob> {
    // Request URL: http://localhost:8000/api/v1/payment/18,24
    try {
      const response = await fetchBlob("payment/" + id, "GET");
      console.log("response getByIdBlob: ", response);
      return response;
    } catch (error) {
      console.error("Error fetching payment blob:", error);
      throw error;
    }
  }

  // static async getQrisImg(payload?: unknown) {
  //   console.log("getQrisImg payload: ", payload);
  //   return await fetchBlobImg(`${payload}`, "GET");
  // }

  static async submitPayment(url: string, body: object) {
    return fetchData<SppPrint[]>(`${url}`, "POST", body);
  }
}
