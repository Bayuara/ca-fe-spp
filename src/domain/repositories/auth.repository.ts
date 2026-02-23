/**
 * Domain Repository Interface
 * Mendefinisikan kontrak tanpa implementasi konkret
 */

import type { User } from "../entities/User";

export interface ChangeProfilePayload {
  email: string;
  phoneNumber: string;
}

export interface ResetPasswordPayload {
  token: string | null;
  password: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface LoginPayload {
  userCode: string;
  password: string;
}

export interface AuthRepository {
  login(payload: LoginPayload): Promise<ApiResponse<unknown>>;
  logout(payload: { refreshToken: string }): Promise<ApiResponse<unknown>>;
  refreshToken(payload: {
    refreshToken: string;
  }): Promise<ApiResponse<unknown>>;
  fetchMe(): Promise<ApiResponse<User>>;
  changePassword(payload: unknown): Promise<ApiResponse<unknown>>;
  resetPassword(payload: ResetPasswordPayload): Promise<ApiResponse<unknown>>;
  changeProfile(payload: ChangeProfilePayload): Promise<ApiResponse<unknown>>;
  forgotPassword(payload: unknown): Promise<ApiResponse<unknown>>;
}
