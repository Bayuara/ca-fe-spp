import {
  AuthRepository,
  RefreshTokenPayload,
} from "@/domain/repositories/auth.repository";

export class RefreshTokenUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(payload: RefreshTokenPayload) {
    const response = await this.authRepository.refreshToken(payload);

    if (response?.status === "success") {
      return {
        success: true,
        message: response?.message || "Token berhasil diperbarui.",
      };
    }

    return { success: false };
  }
}
