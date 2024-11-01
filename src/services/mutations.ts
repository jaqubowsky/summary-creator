"use client";

import { formatCommitsFromAI } from "@/lib/format/format";
import { mutationKeys } from "@/lib/mutation-keys";
import { useDateStore } from "@/stores/date.store";
import { useReposStore } from "@/stores/repos.store";
import { useStateStore } from "@/stores/state.store";
import { FormattedCommit } from "@/types/commits";
import { useMutation } from "@tanstack/react-query";
import { generateDescriptionsFromCommits, getCommitsFromRepos } from "./api";

const useGenerateSummary = () => {
  const { repos } = useReposStore();
  const { startDate, endDate } = useDateStore();
  const { setState } = useStateStore();

  return useMutation({
    mutationKey: [mutationKeys.generateSummary, repos, startDate, endDate],
    mutationFn: async (): Promise<FormattedCommit[] | []> => {
      if (!repos.length) return [];

      setState("fetching");
      const commits = await getCommitsFromRepos(repos, startDate, endDate);
      if (!Object.values(commits)?.length) return [];

      setState("generating");
      const descriptions = await generateDescriptionsFromCommits(commits);
      if (!descriptions.length) return [];

      setState("formatting");
      const summary = formatCommitsFromAI(descriptions);
      return summary;
    },
    onError: (error) => {
      setState("idle");
      console.error(error);
    },
    onSuccess: () => {
      setState("idle");
    },
  });
};

export { useGenerateSummary };
