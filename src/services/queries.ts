import { useQuery } from "@tanstack/react-query";
import { getCommitsFromRepo } from "./api";

export function useCommitsFromRepo(
  repo: string,
  startDate: string,
  endDate: string
) {
  return useQuery({
    queryKey: ["commits", repo, startDate, endDate],
    queryFn: async () => {
      if (!repo) return null;

      return await getCommitsFromRepo(repo, startDate, endDate);
    },
  });
}
