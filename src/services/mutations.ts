'use client';

import { formatCommitsFromAI } from '@/lib/format';
import { mutationKeys } from '@/lib/mutation-keys';
import { useDateStore } from '@/stores/date.store';
import { useReposStore } from '@/stores/repos.store';
import { FormattedCommit } from '@/types/commits';
import { useMutation } from '@tanstack/react-query';
import { generateDescriptionsFromCommits, getCommitsFromRepos } from './api';

const useGenerateSummary = () => {
  const { repos } = useReposStore();
  const { startDate, endDate } = useDateStore();

  return useMutation({
    mutationKey: [mutationKeys.generateSummary, repos, startDate, endDate],
    mutationFn: async (): Promise<FormattedCommit[] | []> => {
      if (!repos.length) return [];

      const commits = await getCommitsFromRepos(repos, startDate, endDate);
      if (!commits) return [];

      const descriptions = await generateDescriptionsFromCommits(commits);
      if (!descriptions) return [];

      const summary = formatCommitsFromAI(descriptions);
      return summary;
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export { useGenerateSummary };
