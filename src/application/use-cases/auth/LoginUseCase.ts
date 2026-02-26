import {
  AuthRepository,
  LoginPayload,
} from "@/domain/repositories/auth.repository";
import { SharedResult } from "../SharedResult";
import { LoginResponseDto } from "@/domain/dto/login.dto";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(
    payload: LoginPayload,
  ): Promise<SharedResult<LoginResponseDto>> {
    const response = await this.authRepository.login(payload);

    return response;
  }
}
