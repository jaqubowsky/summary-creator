"use server";

import * as excel from "@/lib/excel";
import {
  combineCommitsWithSameDate,
  formatGitHubCommit,
  getJSONDataInOrder,
} from "@/lib/format/format";
import octokit from "@/lib/octokit";
import openai from "@/lib/openai";
import { generateDescriptionPrompt } from "@/lib/prompts";
import { FormattedCommit, SortedByDateCommit } from "@/types/commits";

export async function getCommitsFromRepos(
  repos: string[],
  startDate: Date,
  endDate: Date,
) {
  let allCommits: any[] = [];

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
      const perPage = 100;

      while (true) {
        const { data } = await octokit.rest.repos.listCommits({
          owner,
          repo: repoName,
          author: process.env.GITHUB_USERNAME,
          since: startDate.toISOString(),
          until: endDate.toISOString(),
          per_page: perPage,
          page,
          sha: branch.name,
        });

        if (data.length === 0) break;

        allCommits = allCommits.concat(data);
        page++;
      }
    }
  }

  if (!allCommits.length) return null;

  allCommits.reverse();

  const commits = allCommits.map((commit) => {
    const repoName = commit.parents[0].url.split("/")[5];

    return formatGitHubCommit(commit, repoName);
  });

  return combineCommitsWithSameDate(commits);
}

export async function generateDescriptionsFromCommits(
  commits: SortedByDateCommit[],
) {
  if (!commits) return [];

  const descriptions = [];

  for (const day of commits) {
    const dayOfCommits = Object.values(day)[0];

    const { system, user } = generateDescriptionPrompt(dayOfCommits);

    try {
      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL as string,
        response_format: {
          type: "json_object",
        },
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

      const completion = response.choices[0].message.content;
      if (!completion) continue;

      const parsedCompletion = JSON.parse(completion);
      if (!parsedCompletion.workDone) continue;

      descriptions.push(...parsedCompletion.workDone);
    } catch (error) {
      console.error(error);
    }
  }

  return descriptions;
}

export const exportCommitsDataToExcel = async (
  data: FormattedCommit[] | undefined,
) => {
  if (!data) return;

  const { workbook, worksheet } = excel.createNewWorkbook("Commits");

  const correctOrder = [
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

  const orderedData = getJSONDataInOrder(
    data,
    correctOrder,
  ) as FormattedCommit[];
  const headers = Object.keys(orderedData[0]) as (keyof FormattedCommit)[];

  const capitalizedHeaders = excel.capitalizeHeaders(headers);
  const headerRow = worksheet.addRow(capitalizedHeaders);
  excel.setFontAndFill(headerRow);

  const columnWidths = [20, 40, 30, 15, 15, 20, 15, 10, 10, 10, 10, 15];
  excel.setColumnWidths(worksheet, columnWidths);

  excel.addDataToWorksheet(orderedData, worksheet);
  excel.formatHoursAndMinutes(worksheet);

  await excel.downloadWorkbook(workbook, "commits");
};
