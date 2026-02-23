import { fetchData } from "../utils/api";
import { User } from "./types/user";

export default class AuthService {
  static async login(payload: unknown) {
    return fetchData<{
      user: User;
      accessToken: string;
      refreshToken: string;
      isPasswordChangeRequired: boolean;
    }>("user/login", "POST", payload);
  }


  static async logout(val: { refreshToken: string }) {
    return fetchData("user/logout", "POST", val);
  }

  static async refreshToken(payload: { refreshToken: string }) {
    return fetchData<{
      accessToken: string;
    }>("user/session/refresh", "POST", payload);
  }

  static async fetchMe() {
    return fetchData<User>("user/me", "GET");
  }

  static async changePassword(payload: unknown) {
    return fetchData("user/update-password", "PUT", payload);
  }

  static async resetPassword(payload: unknown) { 
    return fetchData("user/reset-password", "PUT", payload);
  }

  static async changeProfile(payload: unknown) {
    return fetchData("user", "PUT", payload);
  }

  static async forgotPassword(payload: unknown) {
    return fetchData("user/forgot-password", "POST", payload);
  }
}
