"use client";

import {
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "@/lib/date";
import { formatCommitsFromRepos } from "@/lib/format";
import { useCommitsFromRepo } from "@/services/queries";
import { useState } from "react";
import { SummaryAside } from "./SummaryAside";
import { SummaryHeader } from "./SummaryHeader";
import { SummaryTable } from "./SummaryTable";

export default function MainPage() {
  const [repoInput, setRepoInput] = useState("");
  const [startDate, setStartDate] = useState(getFirstDayOfCurrentMonth());
  const [endDate, setEndDate] = useState(getLastDayOfCurrentMonth());

  const reposQuery = useCommitsFromRepo(repoInput, startDate, endDate);
  const filteredCommits = formatCommitsFromRepos(
    reposQuery.data ?? [],
    startDate,
    endDate
  );

  return (
    <div className="flex h-screen w-full flex-col dark:bg-gray-950 dark:text-gray-50">
      <SummaryHeader data={filteredCommits} />

      <div className="flex h-full">
        <SummaryAside
          repoInput={repoInput}
          setRepoInput={setRepoInput}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <div className="bg-zinc-900 p-4 flex flex-col gap-4">
          <main className="flex-1 overflow-auto p-6">
            <SummaryTable data={filteredCommits} />
          </main>
        </div>
      </div>
    </div>
  );
}
