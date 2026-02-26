import type { AuthRepository } from "@/domain/repositories/auth.repository";

export class LogoutUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(refreshToken: string): Promise<void> {
    await this.authRepository.logout({ refreshToken });
  }
}
