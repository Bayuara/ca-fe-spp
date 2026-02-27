import { useAuth } from "@/components/hooks/useAuth";
import useWrapInvalidToken from "@/components/hooks/useWrapInvalidToken";
import { useEffect } from "react";
import { fetchMeUseCase } from "@/infrastructure/container";

export function useFetchMe() {
  const { accessToken, setUser, flagRefetch } = useAuth();
  const wrappedFetchMe = useWrapInvalidToken(() => fetchMeUseCase.execute());

  const fetchMe = useEffect(() => {
    let active = true;

    (async () => {
      if (!accessToken) return;
      const response = await wrappedFetchMe();
      if (!active) return;

      setUser(response);
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, flagRefetch]);

  return fetchMe;
}
