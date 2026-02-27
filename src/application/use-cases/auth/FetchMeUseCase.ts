import { User } from "@/domain/entities/User";
import { AuthRepository } from "@/domain/repositories/auth.repository";

export class FetchMeUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<User | undefined> {
    const response = await this.authRepository.fetchMe();
    return response?.data;
  }
}
