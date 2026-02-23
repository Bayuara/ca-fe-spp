import { useQuery } from "@tanstack/react-query";

export default function useCommonQuery<T>(
  queryKey: string[] | string,
  queryFn: () => Promise<T>
) {
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: queryFn,
    refetchOnWindowFocus: false,
  });
}
