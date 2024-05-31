import { Commit, SortedByDateCommit } from "@/types/commits";
import { GitHubCommit } from "@/types/github";

const formatGitHubCommit = (commit: GitHubCommit, repo: string) => {
  const { commit: commitData, author } = commit;
  const { message } = commitData;

  const name = commitData?.author?.name || author?.login || "Unknown";

  const date = new Date(commit.commit.author?.date || "").toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return {
    repo,
    person: name,
    description: message,
    date,
  };
};

const combineCommitsWithSameDate = (commits: Commit[]) => {
  return commits.reduce((acc, commit) => {
    const { date } = commit;
    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(commit);

    return acc;
  }, {} as SortedByDateCommit);
};

export { combineCommitsWithSameDate, formatGitHubCommit };
