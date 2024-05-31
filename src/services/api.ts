import * as excel from "@/lib/excel";
import {
  combineCommitsWithSameDate,
  formatGitHubCommit,
  getJSONDataInOrder,
} from "@/lib/format";
import octokit from "@/lib/octokit";
import openai from "@/lib/openai";
import { generateDescriptionPrompt } from "@/lib/prompts";
import { AICommit, FormattedCommit, SortedByDateCommit } from "@/types/commits";

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

export async function generateDescriptionsFromCommits(
  commits: SortedByDateCommit[]
) {
  if (!commits) return null;

  const descriptions = [];

  for (const day of commits) {
    const dayOfCommits = Object.values(day)[0];

    const { system, user } = generateDescriptionPrompt(dayOfCommits);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
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

  return descriptions as AICommit[];
}

export const exportCommitsDataToExcel = async (data: FormattedCommit[]) => {
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
    correctOrder
  ) as FormattedCommit[];
  const headers = Object.keys(orderedData[0]) as (keyof FormattedCommit)[];

  const capitalizedHeaders = excel.capitalizeHeaders(headers);
  const headerRow = worksheet.addRow(capitalizedHeaders);

  excel.setFontAndFill(headerRow);

  const columnWidths = [20, 40, 30, 15, 15, 20, 15, 10, 10, 10, 10, 15];
  excel.setColumnWidths(worksheet, columnWidths);

  excel.addDataToWorksheet(orderedData, worksheet);

  excel.formatHoursAndMinutes(worksheet);
  excel.calculateTotalTime(worksheet);

  await excel.downloadWorkbook(workbook, "commits");
};
