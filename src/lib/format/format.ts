import { AICommit, Commit, FormattedCommit, SortedByDateCommit } from "@/types/commits";
import { GitHubCommit } from "@/types/github";

const formatGitHubCommit = (commit: GitHubCommit, repo: string) => {
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

  return {
    repo,
    person: name,
    description: message,
    date: formattedDate,
  };
};

function formatCommitsFromAI(
  data: AICommit[],
  issue = "",
  client = "",
  product = "",
  category = "",
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

  const jsonDataInOrder = getJSONDataInOrder(result, order);

  return jsonDataInOrder;
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
