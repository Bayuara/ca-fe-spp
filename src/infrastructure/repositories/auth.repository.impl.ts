/**
 * Infrastructure - Auth Repository Implementation
 * Implementasi konkret dari AuthRepository interface
 */

import type {
  ApiResponse,
  AuthRepository,
  ChangePasswordPayload,
  ChangeProfilePayload,
  ForgotPasswordPayload,
  LoginPayload,
  RefreshTokenPayload,
  ResetPasswordPayload,
} from "@/domain/repositories/auth.repository";
import type { User } from "@/domain/entities/User";
import { ApiClient } from "../api/apiClient";
import { LoginResponseDto } from "@/domain/dto/login.dto";
import { SharedResult } from "@/application/use-cases/SharedResult";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly apiClient: ApiClient) {}

  async login(payload: LoginPayload): Promise<SharedResult<LoginResponseDto>> {
    return this.apiClient.request<LoginResponseDto>(
      "user/login",
      "POST",
      payload,
    );
  }

  async logout(payload: RefreshTokenPayload): Promise<ApiResponse<unknown>> {
    return this.apiClient.request("user/logout", "POST", payload);
  }

  async refreshToken(
    payload: RefreshTokenPayload,
  ): Promise<ApiResponse<unknown>> {
    return this.apiClient.request("user/session/refresh", "POST", payload);
  }

  async fetchMe(): Promise<{ data: User; message: string; status: string }> {
    return this.apiClient.request<User>("user/me", "GET");
  }

  async changePassword(
    payload: ChangePasswordPayload,
  ): Promise<ApiResponse<unknown>> {
    return this.apiClient.request("user/update-password", "PUT", payload);
  }

  async resetPassword(
    payload: ResetPasswordPayload,
  ): Promise<{ data: unknown; message: string; status: string }> {
    return this.apiClient.request("user/reset-password", "PUT", {
      token: payload.token,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    });
  }

  async changeProfile(
    payload: ChangeProfilePayload,
  ): Promise<{ data: unknown; message: string; status: string }> {
    return this.apiClient.request("user", "PUT", payload);
  }

  async forgotPassword(
    payload: ForgotPasswordPayload,
  ): Promise<ApiResponse<unknown>> {
    return this.apiClient.request("user/forgot-password", "POST", payload);
  }
}
