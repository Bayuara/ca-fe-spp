import {
  AuthRepository,
  ChangePasswordPayload,
} from "@/domain/repositories/auth.repository";
import { SharedResult } from "../SharedResult";

export class ChangePasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(payload: ChangePasswordPayload): Promise<SharedResult> {
    const response = await this.authRepository.changePassword(payload);

    return response;
  }
}
