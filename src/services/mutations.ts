import { formatCommitsFromAI } from "@/lib/format";
import { FormattedCommit, SortedByDateCommit } from "@/types/commits";
import { useMutation } from "@tanstack/react-query";
import { generateDescriptionsFromCommits, getCommitsFromRepo } from "./api";

const useFetchCommits = (repo: string, startDate: string, endDate: string) => {
  return useMutation({
    mutationKey: ["fetch-commits"],
    mutationFn: async (): Promise<SortedByDateCommit[] | null> => {
      if (!repo) return null;
      return await getCommitsFromRepo(repo, startDate, endDate);
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
