/**
 * Infrastructure - Auth Repository Implementation
 * Implementasi konkret dari AuthRepository interface
 */

import type {
  AuthRepository,
  ChangeProfilePayload,
  ResetPasswordPayload,
} from "@/domain/repositories/auth.repository";
import type { User } from "@/domain/entities/User";
import { ApiClient } from "../api/apiClient";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async changeProfile(
    payload: ChangeProfilePayload
  ): Promise<{ data: unknown; message: string; status: string }> {
    return this.apiClient.request("user", "PUT", payload);
  }

  async resetPassword(
    payload: ResetPasswordPayload
  ): Promise<{ data: unknown; message: string; status: string }> {
    return this.apiClient.request("user/reset-password", "PUT", {
      token: payload.token,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    });
  }

  async fetchMe(): Promise<{ data: User; message: string; status: string }> {
    return this.apiClient.request<User>("user/me", "GET");
  }
}
