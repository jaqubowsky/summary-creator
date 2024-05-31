import { Repo } from "@/types/repo";

const formatCommitsFromRepos = (
  repos: Repo[],
  startDate: string,
  endDate: string
) => {
  return repos
    .flatMap((repo) => repo.commits)
    .filter((commit) => {
      const commitDate = new Date(commit.date);
      return (
        commitDate >= new Date(startDate) && commitDate <= new Date(endDate)
      );
    })
    .map((commit) => {
      const totalMinutes = commit.hours * 60 + commit.minutes;
      const totalHours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;
      const totalTime = totalHours + remainingMinutes / 60;
      return {
        ...commit,
        totalHours,
        totalMinutes: remainingMinutes,
        totalTime,
      };
    });
};

export { formatCommitsFromRepos };
