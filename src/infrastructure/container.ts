/**
 * Dependency Injection Container
 * Menyediakan instance use case dengan dependency yang di-inject
 */

import { ApiClient } from "./api/apiClient";
import { AuthRepositoryImpl } from "./repositories/auth.repository.impl";
import { ChangeProfileUseCase } from "@/application/use-cases/profile/ChangeProfileUseCase";
import {
  LoginUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
  FetchMeUseCase,
  ChangePasswordUseCase,
  ResetPasswordUseCase,
} from "@/application/use-cases/auth";

// Infrastructure instances
const apiClient = new ApiClient();
const authRepository = new AuthRepositoryImpl(apiClient);

// Use case instances
export const changeProfileUseCase = new ChangeProfileUseCase(authRepository);

export const loginUseCase = new LoginUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase(authRepository);
export const refreshTokenUseCase = new RefreshTokenUseCase(authRepository);
export const fetchMeUseCase = new FetchMeUseCase(authRepository);
export const changePasswordUseCase = new ChangePasswordUseCase(authRepository);
export const resetPasswordUseCase = new ResetPasswordUseCase(authRepository);
