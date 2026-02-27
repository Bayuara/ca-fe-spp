import type { AuthRepository } from "@/domain/repositories/auth.repository";

export class LogoutUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(payload: { refreshToken: string }): Promise<void> {
    await this.authRepository.logout(payload);
  }
}
