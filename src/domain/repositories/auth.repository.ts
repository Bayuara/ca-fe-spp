/**
 * Domain Repository Interface
 * Mendefinisikan kontrak tanpa implementasi konkret
 */

import { LoginResponseDto } from "../dto/login.dto";
import type { User } from "../entities/User";

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface LoginPayload {
  userCode: string;
  password: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface ChangePasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordPayload {
  token: string | null;
  password: string;
  confirmPassword: string;
}

export interface ChangeProfilePayload {
  email: string;
  phoneNumber: string;
}

export interface ForgotPasswordPayload {
  userCode: string;
}

export interface AuthRepository {
  login(payload: LoginPayload): Promise<ApiResponse<LoginResponseDto>>;
  logout(payload: RefreshTokenPayload): Promise<ApiResponse<unknown>>;
  refreshToken(payload: RefreshTokenPayload): Promise<ApiResponse<unknown>>;
  fetchMe(): Promise<ApiResponse<User>>;
  changePassword(payload: ChangePasswordPayload): Promise<ApiResponse<unknown>>;
  resetPassword(payload: ResetPasswordPayload): Promise<ApiResponse<unknown>>;
  changeProfile(payload: ChangeProfilePayload): Promise<ApiResponse<unknown>>;
  forgotPassword(payload: ForgotPasswordPayload): Promise<ApiResponse<unknown>>;
}
