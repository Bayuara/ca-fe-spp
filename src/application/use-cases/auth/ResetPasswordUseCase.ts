import {
  AuthRepository,
  ResetPasswordPayload,
} from "@/domain/repositories/auth.repository";

export class ResetPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(payload: ResetPasswordPayload) {
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
