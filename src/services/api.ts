import octokit from "@/lib/octokit";
import { Commit } from "@/types/commits";
import { Repo } from "@/types/repo";

export async function getCommitsFromRepo(
  repo: string,
  startDate: string,
  endDate: string
) {
  const [owner, name] = repo.split("/");
  let allCommits: any[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const { data } = await octokit.rest.repos.listCommits({
      owner,
      repo: name,
      author: "jaqubowsky",
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

  const commits = allCommits.map((commit) => {
    const { commit: commitData, author } = commit;
    const { message } = commitData;

    const name = commitData?.author?.name || author?.login || "Unknown";
    const commitDate = new Date(commitData.author?.date || "");

    return {
      person: name,
      description: message,
      issue: "",
      client: "R&D",
      product: "InstaGo",
      category: "Programming",
      date: commitDate.toISOString().split("T")[0],
      start: "08:30",
      end: "16:30",
      hours: 8,
      minutes: 0,
    } as Commit;
  });

  return [
    {
      name: repo,
      owner,
      commits,
    },
  ] as Repo[];
}
