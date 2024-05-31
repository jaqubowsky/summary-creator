"use client";

import { formatCommitsFromRepos } from "@/lib/format";
import { useMockedRepositories } from "@/services/queries";
import { useState } from "react";
import { SummaryAside } from "./SummaryAside";
import { SummaryHeader } from "./SummaryHeader";
import { SummaryTable } from "./SummaryTable";

export default function MainPage() {
  const repositoriesQuery = useMockedRepositories();

  const repos = repositoriesQuery.data ?? [];

  const [startDate, setStartDate] = useState("2023-05-01");
  const [endDate, setEndDate] = useState("2023-05-04");

  const [repoInput, setRepoInput] = useState("");

  const filteredCommits = formatCommitsFromRepos(repos, startDate, endDate);

  return (
    <div className="flex h-screen w-full flex-col dark:bg-gray-950 dark:text-gray-50">
      <SummaryHeader data={filteredCommits} />
      <div className="flex h-full">
        <div className="bg-zinc-900 p-4 flex flex-col gap-4">
          <SummaryAside
            repoInput={repoInput}
            setRepoInput={setRepoInput}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <main className="flex-1 overflow-auto p-6">
            <SummaryTable data={filteredCommits} />
          </main>
        </div>
      </div>
    </div>
  );
}
