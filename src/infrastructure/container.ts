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
import {
  CancelPaymentUseCase,
  GetAllSppByMonthUseCase,
  GetAllSppUseCase,
  GetAllWaitingSppUseCase,
  GetByIdBlobUseCase,
  GetByIdUseCase,
  GetPaymentByStatusUseCase,
  GetPaymentByTransactionIdUseCase,
  GetsUseCase,
  SubmitPaymentUseCase,
} from "@/application/use-cases/spp";
import { SppRepositoryImpl } from "./repositories/spp.repository.impl";

// Infrastructure instances
const apiClient = new ApiClient();
const authRepository = new AuthRepositoryImpl(apiClient);
const sppRepository = new SppRepositoryImpl(apiClient);

// Auth use case instances
export const loginUseCase = new LoginUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase(authRepository);
export const refreshTokenUseCase = new RefreshTokenUseCase(authRepository);
export const fetchMeUseCase = new FetchMeUseCase(authRepository);
export const changePasswordUseCase = new ChangePasswordUseCase(authRepository);
export const resetPasswordUseCase = new ResetPasswordUseCase(authRepository);
export const changeProfileUseCase = new ChangeProfileUseCase(authRepository);

// Spp use case instances
export const cancelPaymentUseCase = new CancelPaymentUseCase(sppRepository);
export const getAllSppByMonthUseCase = new GetAllSppByMonthUseCase(
  sppRepository,
);
export const getAllSppUseCase = new GetAllSppUseCase(sppRepository);
export const getAllWaitingSppUseCase = new GetAllWaitingSppUseCase(
  sppRepository,
);
export const getByIdBlobUseCase = new GetByIdBlobUseCase(sppRepository);
export const getByIdUseCase = new GetByIdUseCase(sppRepository);
export const getPaymentByStatusUseCase = new GetPaymentByStatusUseCase(
  sppRepository,
);
export const getPaymentByTransactionIdUseCase =
  new GetPaymentByTransactionIdUseCase(sppRepository);
export const getsUseCase = new GetsUseCase(sppRepository);
export const submitPaymentUseCase = new SubmitPaymentUseCase(sppRepository);
