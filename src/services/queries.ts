import { useQuery } from "@tanstack/react-query";
import { getMockedRepositories } from "./api";

export function useMockedRepositories() {
  return useQuery({
    queryKey: ["repositories"],
    queryFn: getMockedRepositories,
  });
}
