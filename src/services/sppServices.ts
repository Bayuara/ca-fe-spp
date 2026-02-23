/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchBlob,
  fetchBlobImg,
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
      "GET"
    );
  }

  static async getAllWaitingSpp() {
    return fetchData<SppPrint[]>("payment/payment-pending", "GET");
  }

  static async getPaymentByStatus(statusPaymentId: number) {
    return fetchData<Spp[]>(
      `payment/payment-history?statusPaymentId=${statusPaymentId}`,
      "GET"
    );
  }

  // return fetchData<any>(`payment/transaction/${transactionId}`, "GET");
  // const { data, message, status, totalAmount } = await fetchData<any>(
  //   `payment/transaction/${transactionId}`,
  //   "GET"
  // );
  static async getPaymentByTransactionId(transactionId: string) {
    const { data, message, status, totalAmount } = await fetchData<any>(
      "payment/transaction/" + transactionId,
      "GET"
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

  //   static async getPaymentByTransactionId(transactionId: string) {
  //     const { data, message, status } = await fetchData<SppPrint>(`payment/transaction/${transactionId}`, "GET");

  //     // Spread the sppData array and add totalAmount
  //     const spreadSppData = [
  //       ...data.sppData,
  //       { totalAmount: data.totalAmount }
  //     ];

  //     return {
  //       status,
  //       message,
  //       data: {
  //         ...data,
  //         spreadSppData
  //       }
  //     };
  //   }
  // }

  static async cancelPayment(transactionId: string) {
    return fetchData<SppPrint[]>("payment/payment-cancel", "POST", {
      transactionId: transactionId,
    });
  }

  static async gets(payload?: unknown) {
    return fetchData<SppPrint[]>(
      "payment/payment-history?orderBy=year-asc&orderBy=month-asc&" +
        generateSearchParams(payload as object),
      "GET"
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

  static async getQrisImg(payload?: unknown) {
    console.log("getQrisImg payload: ", payload);
    return await fetchBlobImg(`${payload}`, "GET");
  }

  // static async getByIdBlob(id: number): Promise<Blob> {
  //   try {
  //     // Mengambil data dari API dengan fetchBlob
  //     const response = await fetchBlob(`payment/${id}`, "GET");

  //     // Mengubah response menjadi JSON untuk mendapatkan payUrl
  //     const data = await response.json();

  //     // Mengambil payUrl dari data
  //     const payUrl = data?.data?.payUrl;

  //     if (!payUrl) {
  //       throw new Error("No payUrl found");
  //     }

  //     // Fetch the actual file or resource from the payUrl and convert it to Blob
  //     const fileResponse = await fetchBlob(payUrl, "GET");

  //     return fileResponse; // Mengembalikan Blob untuk digunakan dalam pengunduhan
  //   } catch (error) {
  //     console.error("Error fetching payment blob:", error);
  //     throw error;
  //   }
  // }

  // static async getByIdBlob(id: number): Promise<Blob> {
  //   // return fetchBlob("payment/" + id, "GET");
  //   try {
  //     const response = await fetchBlob("payment/" + id, "GET");

  //     const data = await response.json();
  //   }
  // }

  // static async submitPayment(url: string, bodyData: object) {
  //   const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
  //     },
  //     body: JSON.stringify(bodyData), // Send sppId in the body
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   return response.json();
  // }
  // refactoring

  static async submitPayment(url: string, body: object) {
    return fetchData<SppPrint[]>(`${url}`, "POST", body);
  }
}
