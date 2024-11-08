"use client";

import { combineCommitsWithSameDate, formatCommitsFromAI } from "@/lib/format/format";
import { mutationKeys } from "@/lib/mutation-keys";
import { useDateStore } from "@/stores/date.store";
import { useReposStore } from "@/stores/repos.store";
import { useSettingsStore } from "@/stores/settings.store";
import { useStateStore } from "@/stores/state.store";
import { FormattedCommit } from "@/types/commits";
import { useMutation } from "@tanstack/react-query";
import { generateDescriptionsFromCommits, getCommitsFromRepos } from "./api";

const useGenerateSummary = () => {
  const { startDate, endDate } = useDateStore();
  const { repos } = useReposStore();
  const { product, client, category } = useSettingsStore();
  const { setState } = useStateStore();

  return useMutation({
    mutationKey: [mutationKeys.generateSummary, repos, startDate, endDate],
    mutationFn: async (): Promise<FormattedCommit[] | []> => {
      if (!repos.length) return [];

      setState("fetching");
      const commits = await getCommitsFromRepos(repos, startDate, endDate);
      if (!Object.values(commits)?.length) return [];

      const combinedCommitsWithSameDate = combineCommitsWithSameDate(commits);

      setState("generating");
      const descriptions = await generateDescriptionsFromCommits(combinedCommitsWithSameDate);
      if (!descriptions.length) return [];

      setState("formatting");
      const summary = formatCommitsFromAI(descriptions, client, product, category);
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
