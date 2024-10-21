import { AICommit, Commit, FormattedCommit } from "@/types/commits";
import { GitHubCommit } from "@/types/github";
import { describe, expect, it } from "vitest";
import {
  combineCommitsWithSameDate,
  formatCommitsFromAI,
  formatGitHubCommit,
  getJSONDataInOrder,
} from "./format";

describe("formatGitHubCommit", () => {
  it("should format a GitHub commit correctly", () => {
    const sampleCommit = {
      commit: {
        author: {
          name: "John Doe",
          date: "2023-10-01T12:34:56Z",
        },
        message: "Initial commit",
      },
    } as GitHubCommit;

    const repoName = "sample-repo";
    const expectedOutput = {
      repo: "sample-repo",
      person: "John Doe",
      description: "Initial commit",
      date: "01.10.2023",
    };

    const result = formatGitHubCommit(sampleCommit, repoName);
    expect(result).toEqual(expectedOutput);
  });

  it("should format date correctly from different time zones", () => {
    const sampleCommit = {
      commit: {
        author: {
          name: "Jane Doe",
          date: "2023-10-01T23:59:59-05:00",
        },
        message: "Time zone test commit",
      },
    } as GitHubCommit;

    const repoName = "sample-repo";
    const expectedOutput = {
      repo: "sample-repo",
      person: "Jane Doe",
      description: "Time zone test commit",
      date: "02.10.2023",
    };

    const result = formatGitHubCommit(sampleCommit, repoName);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle null author gracefully", () => {
    const sampleCommit = {
      commit: {
        author: null,
        message: "Commit with no author",
      },
    } as GitHubCommit;

    const repoName = "sample-repo";
    const expectedOutput = {
      repo: "sample-repo",
      person: "Unknown",
      description: "Commit with no author",
      date: "Unknown",
    };

    const result = formatGitHubCommit(sampleCommit, repoName);
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
  it("should group commits by the same date", () => {
    const sampleCommits: Commit[] = [
      {
        description: "Commit 1",
        date: "2023-10-01",
        repo: "repo1",
        person: "person1",
      },
      {
        description: "Commit 2",
        date: "2023-10-02",
        repo: "repo1",
        person: "person2",
      },
      {
        description: "Commit 3",
        date: "2023-10-03",
        repo: "repo1",
        person: "person3",
      },
    ];

    const expectedOutput = [
      {
        "2023-10-01": [
          {
            description: "Commit 1",
            date: "2023-10-01",
            repo: "repo1",
            person: "person1",
          },
        ],
      },
      {
        "2023-10-02": [
          {
            description: "Commit 2",
            date: "2023-10-02",
            repo: "repo1",
            person: "person2",
          },
        ],
      },
      {
        "2023-10-03": [
          {
            description: "Commit 3",
            date: "2023-10-03",
            repo: "repo1",
            person: "person3",
          },
        ],
      },
    ];

    const result = combineCommitsWithSameDate(sampleCommits);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle multiple commits on the same date", () => {
    const sampleCommits: Commit[] = [
      {
        description: "Commit 1",
        date: "2023-10-01",
        repo: "repo1",
        person: "person1",
      },
      {
        description: "Commit 2",
        date: "2023-10-01",
        repo: "repo1",
        person: "person2",
      },
      {
        description: "Commit 3",
        date: "2023-10-01",
        repo: "repo1",
        person: "person3",
      },
    ];

    const expectedOutput = [
      {
        "2023-10-01": [
          {
            description: "Commit 1",
            date: "2023-10-01",
            repo: "repo1",
            person: "person1",
          },
          {
            description: "Commit 2",
            date: "2023-10-01",
            repo: "repo1",
            person: "person2",
          },
          {
            description: "Commit 3",
            date: "2023-10-01",
            repo: "repo1",
            person: "person3",
          },
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
