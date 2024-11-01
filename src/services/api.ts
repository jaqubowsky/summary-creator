"use server";

import { combineCommitsWithSameDate, formatGitHubCommit } from "@/lib/format/format";
import octokit from "@/lib/octokit";
import openai from "@/lib/openai";
import { generateDescriptionPrompt } from "@/lib/prompts";
import { promptSchema } from "@/schemas/prompt.schema";
import { AICommit, SortedByDateCommit } from "@/types/commits";
import { GitHubCommit } from "@/types/github";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

export async function getAllRepositories() {
  const { data } = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 100,
  });

  return data.map((repo) => repo.full_name);
}

export async function getCommitsFromRepos(repos: string[], startDate: Date, endDate: Date) {
  let allCommits: GitHubCommit[] = [];

  for (const repo of repos) {
    const [owner, repoName] = repo.split("/");

    const branches = await octokit.rest.repos.listBranches({
      owner,
      repo: repoName,
    });

    branches.data.sort((a, b) => {
      if (a.name === "develop" || a.name === "master") return 1;
      if (b.name === "develop" || b.name === "master") return -1;
      if (a.name.includes("release")) return 1;
      if (b.name.includes("release")) return -1;
      return 0;
    });

    for (const branch of branches.data) {
      let page = 1;
      const perPage = 999;

      while (true) {
        const { data } = (await octokit.rest.repos.listCommits({
          owner,
          repo: repoName,
          author: process.env.GITHUB_USERNAME,
          since: startDate.toISOString(),
          until: endDate.toISOString(),
          per_page: perPage,
          page,
          sha: branch.name,
        })) as { data: GitHubCommit[] };

        if (data.length === 0) break;

        allCommits = allCommits.concat(data);
        page++;
      }
    }
  }

  if (!allCommits.length) return [];

  allCommits.reverse();

  const commits = allCommits.map((commit) => {
    const repoName = commit.parents[0].url.split("/")[5];

    return formatGitHubCommit(commit, repoName);
  });

  return combineCommitsWithSameDate(commits);
}

export async function generateDescriptionsFromCommits(commits: SortedByDateCommit[]) {
  if (!commits) return [];

  const descriptions: AICommit[] = [];

  for (const day of commits) {
    const dayOfCommits = Object.values(day)[0];

    const { system, user } = generateDescriptionPrompt(dayOfCommits);

    try {
      const response = await openai.beta.chat.completions.parse({
        model: process.env.OPENAI_MODEL as string,
        response_format: zodResponseFormat(promptSchema, "data"),
        messages: [
          {
            role: "system",
            content: system,
          },
          {
            role: "user",
            content: user,
          },
        ],
      });

      const data = response.choices[0].message?.parsed?.data;
      if (!data?.length) continue;

      descriptions.push(...data);
    } catch (error) {
      console.error(error);
    }
  }

  return descriptions;
}
