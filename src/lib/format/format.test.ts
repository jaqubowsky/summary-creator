import { AICommit, Commit, FormattedCommit } from "@/types/commits";
import { GitHubCommit } from "@/types/github";
import { describe, expect, it } from "vitest";
import {
  combineCommitsWithSameDate,
  formatCommitsFromAI,
  formatGitHubCommit,
  getJSONDataInOrder,
} from "./format";

const sampleRepoName = "sample-repo";

describe("formatGitHubCommit", () => {
  const createGitHubCommit = (name: string | null, date: string, message: string): GitHubCommit =>
    ({
      commit: {
        author: name ? { name, email: "default@example.com", date } : null,
        message,
      },
    }) as GitHubCommit;

  it("should format a GitHub commit correctly", () => {
    const sampleCommit = createGitHubCommit("John Doe", "2023-10-01T12:34:56Z", "Initial commit");
    const expectedOutput = {
      repo: sampleRepoName,
      person: "John Doe",
      description: "Initial commit",
      date: "01.10.2023",
    };

    const result = formatGitHubCommit(sampleCommit, sampleRepoName);
    expect(result).toEqual(expectedOutput);
  });

  it("should format date correctly from different time zones", () => {
    const sampleCommit = createGitHubCommit(
      "Jane Doe",
      "2023-10-01T23:59:59-05:00",
      "Time zone test commit",
    );
    const expectedOutput = {
      repo: sampleRepoName,
      person: "Jane Doe",
      description: "Time zone test commit",
      date: "02.10.2023",
    };

    const result = formatGitHubCommit(sampleCommit, sampleRepoName);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle null author gracefully", () => {
    const sampleCommit = createGitHubCommit(null, "", "Commit with no author");
    const expectedOutput = {
      repo: sampleRepoName,
      person: "Unknown",
      description: "Commit with no author",
      date: "Unknown",
    };

    const result = formatGitHubCommit(sampleCommit, sampleRepoName);
    expect(result).toEqual(expectedOutput);
  });
});

describe("formatCommitsFromAI", () => {
  it("should format AI commits correctly", () => {
    const sampleData: AICommit[] = [
      {
        description: "Commit 1",
        start: "10:00",
        end: "11:00",
        hours: 1,
        minutes: 0,
        totalTime: 0,
        person: "",
        date: "",
      },
    ];

    const expectedOutput: FormattedCommit[] = [
      {
        description: "Commit 1",
        issue: "",
        client: "",
        product: "",
        category: "",
        end: "11:00",
        hours: 1,
        minutes: 0,
        totalTime: 0,
        person: "",
        date: "",
        start: "10:00",
      },
    ];

    const result = formatCommitsFromAI(sampleData);
    expect(result).toEqual(expectedOutput);
  });
});

describe("getJSONDataInOrder", () => {
  const sampleData: FormattedCommit[] = [
    {
      description: "Commit 1",
      issue: "Issue 1",
      client: "Client 1",
      product: "Product 1",
      category: "Category 1",
      end: "12:00",
      hours: 1,
      minutes: 0,
      totalTime: 0,
      person: "",
      date: "",
      start: "",
    },
  ];

  it("should order JSON data according to the specified order", () => {
    const order = ["description", "client", "product"];
    const expectedOutput = [
      {
        description: "Commit 1",
        client: "Client 1",
        product: "Product 1",
        category: "Category 1",
        issue: "Issue 1",
        end: "12:00",
        hours: 1,
        minutes: 0,
        totalTime: 0,
        person: "",
        date: "",
        start: "",
      },
    ];

    const result = getJSONDataInOrder(sampleData, order);
    expect(result).toEqual(expectedOutput);
  });

  it("if not whole data is included in order, then rest of the data should be appended at the end", () => {
    const order = ["description", "client", "product", "category"];
    const expectedOutput = [
      {
        description: "Commit 1",
        client: "Client 1",
        product: "Product 1",
        category: "Category 1",
        issue: "Issue 1",
        end: "12:00",
        hours: 1,
        minutes: 0,
        totalTime: 0,
        person: "",
        date: "",
        start: "",
      },
    ];

    const result = getJSONDataInOrder(sampleData, order);
    expect(result).toEqual(expectedOutput);
  });
});

describe("combineCommitsWithSameDate", () => {
  const createCommit = (description: string, date: string, person: string): Commit => ({
    description,
    date,
    repo: "repo1",
    person,
  });

  it("should group commits by the same date", () => {
    const sampleCommits: Commit[] = [
      createCommit("Commit 1", "2023-10-01", "person1"),
      createCommit("Commit 2", "2023-10-02", "person2"),
      createCommit("Commit 3", "2023-10-03", "person3"),
    ];

    const expectedOutput = [
      {
        "2023-10-01": [createCommit("Commit 1", "2023-10-01", "person1")],
      },
      {
        "2023-10-02": [createCommit("Commit 2", "2023-10-02", "person2")],
      },
      {
        "2023-10-03": [createCommit("Commit 3", "2023-10-03", "person3")],
      },
    ];

    const result = combineCommitsWithSameDate(sampleCommits);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle multiple commits on the same date", () => {
    const sampleCommits: Commit[] = [
      createCommit("Commit 1", "2023-10-01", "person1"),
      createCommit("Commit 2", "2023-10-01", "person2"),
      createCommit("Commit 3", "2023-10-01", "person3"),
    ];

    const expectedOutput = [
      {
        "2023-10-01": [
          createCommit("Commit 1", "2023-10-01", "person1"),
          createCommit("Commit 2", "2023-10-01", "person2"),
          createCommit("Commit 3", "2023-10-01", "person3"),
        ],
      },
    ];

    const result = combineCommitsWithSameDate(sampleCommits);
    expect(result).toEqual(expectedOutput);
  });

  it("should return empty array when given empty array", () => {
    const sampleCommits: Commit[] = [];

    const expectedOutput = [] as Commit[];

    const result = combineCommitsWithSameDate(sampleCommits);
    expect(result).toEqual(expectedOutput);
  });
});
