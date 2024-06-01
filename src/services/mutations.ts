import { formatCommitsFromAI } from "@/lib/format";
import { FormattedCommit, SortedByDateCommit } from "@/types/commits";
import { useMutation } from "@tanstack/react-query";
import { generateDescriptionsFromCommits, getCommitsFromRepos } from "./api";

const useFetchCommits = (
  repos: string[],
  startDate: string,
  endDate: string
) => {
  return useMutation({
    mutationKey: ["fetch-commits"],
    mutationFn: async (): Promise<SortedByDateCommit[] | null> => {
      if (!repos.length) return null;

      return await getCommitsFromRepos(repos, startDate, endDate);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const useGenerateDescriptions = () => {
  return useMutation({
    mutationKey: ["generate-descriptions"],
    mutationFn: async (
      data: SortedByDateCommit[]
    ): Promise<FormattedCommit[] | null> => {
      const descriptions = await generateDescriptionsFromCommits(data);
      if (!descriptions) return null;
      return formatCommitsFromAI(descriptions) as FormattedCommit[];
    },
  });
};

export { useFetchCommits, useGenerateDescriptions };
