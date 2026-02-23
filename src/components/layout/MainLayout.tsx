import { Outlet } from "react-router-dom";
import { useLayout } from "../hooks/useLayout";
import NavigationBar from "./navigation/NavigationBar";
import { useAuth } from "../hooks/useAuth";
import useWrapInvalidToken from "../hooks/useWrapInvalidToken";
import AuthService from "@/services/authServices";
import { useEffect } from "react";

function MainLayout() {
  const { accessToken, setUser, flagRefetch } = useAuth();
  const wrappedFetchMe = useWrapInvalidToken(AuthService.fetchMe);
  useEffect(() => {
    let active = true;

    (async () => {
      if (!accessToken) return;

      const response = await wrappedFetchMe();
      if (!active) return;

      setUser(response.data);
      // console.log("fetchMe: ", response.data);
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, flagRefetch]);

  const { hideLayout } = useLayout();

  if (hideLayout) return <Outlet />;

  return (
    <main className="min-h-screen bg-putihNormal">
      <NavigationBar />
      <Outlet />
    </main>
  );
}

export default MainLayout;
