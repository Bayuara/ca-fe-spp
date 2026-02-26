export interface LoginResponseDto {
  username: string;
  isActive: boolean;
  isVerified: boolean;
  accessToken: string;
  refreshToken: string;
  loginStatus: "SUCCESS" | "FAILED";
  isPasswordChangeRequired: boolean;
}
