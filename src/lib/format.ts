import {
  AICommit,
  Commit,
  FormattedCommit,
  SortedByDateCommit,
} from '@/types/commits';
import { GitHubCommit } from '@/types/github';

const formatGitHubCommit = (commit: GitHubCommit, repo: string) => {
  const { commit: commitData, author } = commit;
  const { message } = commitData;

  const name = commitData?.author?.name || author?.login || 'Unknown';

  const date = new Date(commit.commit.author?.date || '')
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .split('/')
    .join('.');

  return {
    repo,
    person: name,
    description: message,
    date,
  };
};

function formatCommitsFromAI(
  data: AICommit[],
  issue = '',
  client = 'R&D',
  product = 'InstaGo',
  category = 'Programming'
): FormattedCommit[] {
  const result: FormattedCommit[] = [];

  for (const entry of data) {
    result.push({
      ...entry,
      issue,
      client,
      product,
      category,
    });
  }

  return result;
}

function getJSONDataInOrder(data: FormattedCommit[], order: string[]) {
  const orderedData = data.map((commit) => {
    const orderedCommit: { [key: string]: string | number } = {};

    order.forEach((header) => {
      orderedCommit[header] = commit[header as keyof FormattedCommit];
    });

    return orderedCommit;
  });

  return orderedData;
}

function combineCommitsWithSameDate(
  commits: Commit[]
): { [date: string]: Commit[] }[] {
  const groupedCommits: SortedByDateCommit = commits.reduce((acc, commit) => {
    const { date, ...rest } = commit;
    if (!acc[date]) acc[date] = [];

    acc[date].push({ ...rest, date });

    return acc;
  }, {} as SortedByDateCommit);

  return Object.keys(groupedCommits).map((date) => ({
    [date]: groupedCommits[date],
  }));
}

export {
  combineCommitsWithSameDate,
  formatCommitsFromAI,
  formatGitHubCommit,
  getJSONDataInOrder,
};
