import { AICommit, Commit, FormattedCommit, SortedByDateCommit } from "@/types/commits";
import { GitHubCommit } from "@/types/github";

const formatGitHubCommit = (commit: GitHubCommit, owner: string, repo: string) => {
  const { commit: commitData, author } = commit;
  const { message } = commitData;

  const name = commitData?.author?.name ?? author?.login ?? "Unknown";

  const dateString = commit.commit.author?.date ?? "";
  const date = dateString ? new Date(dateString) : null;

  const formattedDate =
    date && !isNaN(date.getTime())
      ? date
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .split("/")
          .join(".")
      : "Unknown";

  const issueMatch = message.match(/#(\d+)/);
  const issueNumber = issueMatch ? issueMatch[1] : "";
  const issueLink = issueNumber ? `https://github.com/${owner}/${repo}/issues/${issueNumber}` : "";

  return {
    repo,
    person: name,
    description: message,
    date: formattedDate,
    issue: issueLink,
  };
};

function formatCommitsFromAI(data: AICommit[], client = "", product = "", category = "") {
  const commits: FormattedCommit[] = data.map((commit) => {
    return {
      ...commit,
      client,
      product,
      category,
      totalTime: (commit?.hours * 60 + commit?.minutes) / 60 || 0,
    };
  });

  const order = [
    "person",
    "description",
    "issue",
    "client",
    "product",
    "category",
    "date",
    "start",
    "end",
    "hours",
    "minutes",
    "totalTime",
  ];

  return getJSONDataInOrder(commits, order);
}

function getJSONDataInOrder(data: FormattedCommit[], order: string[]) {
  const orderedData = data.map((commit) => {
    const orderedCommit: { [key: string]: string | number } = {};

    order.forEach((header) => {
      orderedCommit[header] = commit[header as keyof FormattedCommit];
    });

    Object.keys(commit).forEach((key) => {
      if (!(key in orderedCommit)) {
        orderedCommit[key] = commit[key as keyof FormattedCommit];
      }
    });

    return orderedCommit;
  });

  return orderedData as FormattedCommit[];
}

function combineCommitsWithSameDate(commits: Commit[]): { [date: string]: Commit[] | [] }[] {
  try {
    const groupedCommits: SortedByDateCommit = commits.reduce((acc, commit) => {
      const { date, ...rest } = commit;
      if (!acc[date]) acc[date] = [];

      acc[date].push({ ...rest, date });

      return acc;
    }, {} as SortedByDateCommit);

    return Object.keys(groupedCommits).map((date) => ({
      [date]: groupedCommits[date],
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { combineCommitsWithSameDate, formatCommitsFromAI, formatGitHubCommit, getJSONDataInOrder };
