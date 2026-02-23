// src/components/hooks/useWrapInvalidToken.ts
import { useCallback } from "react";
import { useAuth } from "./useAuth";
import AuthorizationError from "@/shared/authorizationError";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/authServices";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function useWrapInvalidToken<T>(
  callback: (...args: any) => Promise<T>
) {
  const { refreshToken, onLogIn, onLogOut } = useAuth();
  const navigate = useNavigate();

  const wrappedCallback = useCallback(async (...args: any) => {
    try {
      const response = await callback(...args);
      return response;
    } catch (error) {
      if (!(error instanceof AuthorizationError)) {
        throw error;
      }

      try {
        const {
          data: { accessToken },
        } = await AuthService.refreshToken({
          refreshToken,
        });
        onLogIn({ accessToken, refreshToken });

        const newResponse = await callback(args);
        // console.log("useWrapInvalidToken: ", newResponse);
        return newResponse;
      } catch (error) {
        // console.log("useWrapInvalidToken error: ", { error });
        onLogOut();
        navigate("/login");
        return null!;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return wrappedCallback;
}
