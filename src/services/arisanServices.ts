import { generateSearchParams } from "../utils/api";
import { Arisan } from "./types/arisan";

interface ArisanItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arisanStatusPayment: any; // Adjust the type accordingly
  // other properties
}

export default class ArisanService {
  static async getAllArisan() {
    const token = localStorage.getItem("Token"); // Retrieve token from localStorage
    if (!token) throw new Error("No token available");

    const url = `${import.meta.env.VITE_API_URL}/arisan/report?token=${encodeURIComponent(token)}`; // Append token to the URL

    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    });
  }

  static async getUrl() {
    const url = `${import.meta.env.VITE_API_URL}/setting/frontend-url`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();

    return result;
  }

  static async getPaymentByStatus() {
    const url = `${import.meta.env.VITE_API_URL}/status-payment`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response}`);
    }

    const result = await response.json();

    return result;
  }

  static async gets(payload?: unknown) {
    const token = localStorage.getItem("Token");
    if (!token) throw new Error("No token available");

    const url =
      `${import.meta.env.VITE_API_URL}/arisan/report?token=${token}&` +
      generateSearchParams(payload as object);

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response}`);
    }

    const { data, message, page } = await response.json();

    return {
      message, // message returned from the API
      page, // pagination information, like page number or total pages
      // data: data.map((d) => {
      data: data.map((d: ArisanItem) => {
        // `data` is an array, and we use `map` to transform each item
        const { arisanStatusPayment, ...otherItem } = d;
        // Destructure `arisanStatusPayment` from each object `d`, while the rest of the properties go into `otherItem`

        return {
          ...otherItem, // Spread `otherItem` (all other properties except `arisanStatusPayment`)
          ...arisanStatusPayment, // Spread `arisanStatusPayment` so its properties are merged into the top level of the object
        } as Arisan; // Type assertion that the resulting object is of type `Student`
      }),
    };
  }
}
