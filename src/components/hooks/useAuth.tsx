// src/components/hooks/useAuth.tsx
import { useContext } from "react";
import { AuthContext, IAuthContext } from "../context/AuthProvider";

export function useAuth() {
  return useContext(AuthContext) as IAuthContext;
}
