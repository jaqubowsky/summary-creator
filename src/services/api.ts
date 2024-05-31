import { combineCommitsWithSameDate, formatGitHubCommit } from "@/lib/format";
import octokit from "@/lib/octokit";

export async function getCommitsFromRepo(
  repo: string,
  startDate: string,
  endDate: string
) {
  const [owner, repoName] = repo.split("/");
  let allCommits: any[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const { data } = await octokit.rest.repos.listCommits({
      owner,
      repo: repoName,
      author: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
      since: startDate,
      until: endDate,
      per_page: perPage,
      page,
    });

    if (data.length === 0) break;

    allCommits = allCommits.concat(data);
    page++;
  }

  allCommits.reverse();

  if (!allCommits.length) return null;

  const commits = allCommits.map((commit) =>
    formatGitHubCommit(commit, repoName)
  );

  return combineCommitsWithSameDate(commits);
}
