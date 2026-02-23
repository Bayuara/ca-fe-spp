/**
 * Infrastructure - API Client
 * Implementasi konkret untuk komunikasi HTTP
 */

import AuthorizationError from "@/shared/authorizationError";

export interface ApiClientResponse<T> {
  data: T;
  message: string;
  status: string;
  page?: { totalItems: number };
  totalAmount?: number;
}

export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? import.meta.env.VITE_API_URL ?? "";
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
    };
  }

  async request<T>(
    url: string,
    method: string,
    body?: unknown
  ): Promise<ApiClientResponse<T>> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        throw new AuthorizationError();
      }
      const { message } = await response.json();
      throw new Error(message);
    }

    return response.json();
  }
}
