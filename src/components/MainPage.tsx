"use client";

import {
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "@/lib/date";
import { useFetchCommits, useGenerateDescriptions } from "@/services/mutations";
import { useEffect, useState } from "react";
import { SummaryAside } from "./SummaryAside";
import { SummaryHeader } from "./SummaryHeader";
import { SummaryTable } from "./SummaryTable";

export default function MainPage() {
  const [repoInput, setRepoInput] = useState("");
  const [startDate, setStartDate] = useState(getFirstDayOfCurrentMonth());
  const [endDate, setEndDate] = useState(getLastDayOfCurrentMonth());

  const {
    mutate: fetchCommits,
    data: commitsData,
    isSuccess: isFetchCommitsSuccess,
    isPending: isFetchingCommits,
  } = useFetchCommits(repoInput, startDate, endDate);

  const {
    mutate: generateDescriptions,
    data: formattedCommits,
    isPending: isGeneratingDescriptions,
  } = useGenerateDescriptions();

  useEffect(() => {
    if (isFetchCommitsSuccess && commitsData) {
      generateDescriptions(commitsData);
    }
  }, [isFetchCommitsSuccess, commitsData, generateDescriptions]);

  const isLoading = isFetchingCommits || isGeneratingDescriptions;

  return (
    <div className="flex h-screen w-full flex-col dark:bg-gray-950 dark:text-gray-50">
      <SummaryHeader data={formattedCommits ?? []} />
      <div className="flex h-full">
        <SummaryAside
          repoInput={repoInput}
          setRepoInput={setRepoInput}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleGenerateDescriptions={fetchCommits}
        />
        <div className="bg-zinc-900 flex flex-col gap-4 w-full flex-1 overflow-auto p-6">
          <SummaryTable isLoading={isLoading} data={formattedCommits ?? []} />
        </div>
      </div>
    </div>
  );
}
