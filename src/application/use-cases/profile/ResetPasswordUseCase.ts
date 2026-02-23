/**
 * Application Use Case - Reset Password
 * Mengandung business logic tanpa dependensi UI atau infrastruktur
 */

import type {
  AuthRepository,
  ResetPasswordPayload,
} from "@/domain/repositories/auth.repository";

export interface ResetPasswordResult {
  success: boolean;
  message?: string;
}

export class ResetPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(payload: ResetPasswordPayload): Promise<ResetPasswordResult> {
    const response = await this.authRepository.resetPassword(payload);

    if (response?.status === "success") {
      return {
        success: true,
        message: response?.message || "Password berhasil diganti.",
      };
    }

    return { success: false };
  }
}
