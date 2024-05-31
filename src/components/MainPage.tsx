"use client";

import {
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "@/lib/date";
import { formatCommitsFromAI } from "@/lib/format";
import { generateDescriptionsFromCommits } from "@/services/api";
import { useCommitsFromRepo } from "@/services/queries";
import { FormattedCommit } from "@/types/commits";
import { useState } from "react";
import { SummaryAside } from "./SummaryAside";
import { SummaryHeader } from "./SummaryHeader";
import { SummaryTable } from "./SummaryTable";
import { Button } from "./ui/button";

export default function MainPage() {
  const [repoInput, setRepoInput] = useState("");
  const [startDate, setStartDate] = useState(getFirstDayOfCurrentMonth());
  const [endDate, setEndDate] = useState(getLastDayOfCurrentMonth());
  const [aiData, setAIData] = useState<FormattedCommit[] | []>([]);

  const reposQuery = useCommitsFromRepo(repoInput, startDate, endDate);

  console.log(reposQuery.data);

  const handleGenerateDescriptions = async () => {
    try {
      console.log(reposQuery.data);

      if (!reposQuery.data) return;

      const response = await generateDescriptionsFromCommits(reposQuery.data);
      if (!response) return setAIData([]);

      console.log(response, "RESPONSE");
      const formattedResponse = formatCommitsFromAI(response);

      console.log(formattedResponse, "FORMATTED RESPONSE");

      setAIData(formattedResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col dark:bg-gray-950 dark:text-gray-50">
      <SummaryHeader data={aiData} />

      <Button onClick={handleGenerateDescriptions}>
        generate descriptions
      </Button>

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
            <SummaryTable data={aiData} />
          </main>
        </div>
      </div>
    </div>
  );
}
