import { mutationKeys } from "@/lib/mutation-keys";
import { useQuery } from "@tanstack/react-query";
import { getAllRepositories } from "./api";

const useGetRepos = () => {
  return useQuery({
    queryKey: [mutationKeys.getRepos],
    queryFn: async (): Promise<string[]> => {
      const data = await getAllRepositories();
      return data;
    },
  });
};

export { useGetRepos };
