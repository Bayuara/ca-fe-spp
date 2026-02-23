/**
 * Application Use Case - Change Profile
 * Mengandung business logic tanpa dependensi UI atau infrastruktur
 */

import type { AuthRepository, ChangeProfilePayload } from "@/domain/repositories/auth.repository";

export interface ChangeProfileResult {
  success: boolean;
  message?: string;
}

export class ChangeProfileUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(payload: ChangeProfilePayload): Promise<ChangeProfileResult> {
    const response = await this.authRepository.changeProfile(payload);

    if (response?.status === "success") {
      return {
        success: true,
        message: response?.message || "Informasi profil berhasil diperbarui.",
      };
    }

    return { success: false };
  }
}
