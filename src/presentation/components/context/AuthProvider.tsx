// src/components/context/AuthProvider.tsx
// import { User } from "../../services/types/user";
import { User } from "@/domain/entities/User";
import React, { useMemo, useState } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  user?: User;
  onLogIn: (val: {
    // user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;
  onLogOut: () => void;
  refetch: () => void;
  setUser: (val?: User) => void;
  flagRefetch: boolean;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const [user, setUser] = useState<User | undefined>(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     try {
  //       return JSON.parse(storedUser) as User;
  //     } catch (error) {
  //       console.error("Failed to parse user from localStorage:", error);
  //       return undefined;
  //     }
  //   }
  //   return undefined;
  // });
  const [refetch, setRefetch] = useState(false);
  const [user, setUser] = useState<User | undefined>(() => {
    if (!localStorage.getItem("user")) return undefined;
    return JSON.parse(localStorage.getItem("user")!) as User;
  });
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem("accessToken") ?? ""
  );

  const [refreshToken, setRefreshToken] = useState<string>(
    localStorage.getItem("refreshToken") ?? ""
  );

  const isAuthenticated = useMemo(() => Boolean(accessToken), [accessToken]);

  const onLogIn = (val: {
    // user: User;
    accessToken: string;
    refreshToken: string;
  }) => {
    setAccessToken(val.accessToken);
    setRefreshToken(val.refreshToken);
    localStorage.setItem("accessToken", val.accessToken);
    localStorage.setItem("refreshToken", val.refreshToken);
    // setToken(val.token);
    // setUser(val.user);
    // localStorage.setItem("nickname", val.user.nickname);
    // console.log("Nickname after login:", val.user.nickname);
    // localStorage.setItem("token", val.token);
    // localStorage.setItem("user", JSON.stringify(val.user.name));
    // console.log("Token after login AuthContext:", val.accessToken);
  };

  const onLogOut = () => {
    setAccessToken("");
    setRefreshToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    setUser(undefined);
    // console.log("Token after logout:", accessToken);
    // console.log("User after logout:", user);
  };

  // useEffect(() => {
  //   let active = true;

  //   (async () => {
  //     if (!accessToken) return;

  //     try {
  //       const response = await AuthService.fetchMe();
  //       console.log("Full API AuthProvider Response:", response); // Log the entire response

  //       if (!active) return;

  //       const fetchedUser = response.data;
  //       if (fetchedUser) {
  //         setUser(fetchedUser);

  //         // Store the nickname in localStorage if it exists
  //         if (fetchedUser) {
  //           console.log(
  //             "Nickname after fetchMe:",
  //             fetchedUser.userDetail.nickname
  //           );
  //           localStorage.setItem("nickname", fetchedUser.userDetail.nickname);
  //         } else {
  //           console.warn("Fetched user does not have a nickname.");
  //         }
  //       } else {
  //         console.error(
  //           "Failed to fetch user data, Response Data:",
  //           response.data
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error during fetchMe:", error);
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [accessToken, flagRefecth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        refreshToken,
        user,
        onLogIn,
        onLogOut,
        refetch: () => setRefetch(!refetch),
        setUser,
        flagRefetch: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
