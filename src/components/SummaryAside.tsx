"use client";

import { formatStringToDate } from "@/lib/date/date";
import { useGenerateSummary } from "@/services/mutations";
import { useDateStore } from "@/stores/date.store";
import { useReposStore } from "@/stores/repos.store";
import { useState } from "react";
import { ReposWrapper } from "./ReposWrapper";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SummaryAside = () => {
  const [repoInput, setRepoInput] = useState("");

  const { addRepo } = useReposStore();
  const { startDate, endDate, setStartDate, setEndDate } = useDateStore();

  const { mutate: handleGenerateSummary, isPending } = useGenerateSummary();

  const handleSetRepo = () => {
    addRepo(repoInput);
    setRepoInput("");
  };

  return (
    <aside className="p-6 bg-gray-900 rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="repoInput" className="text-sm text-gray-300">
            Repo to fetch:
          </Label>
          <Input
            id="repoInput"
            type="text"
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSetRepo()}
            className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSetRepo}>Add Repo</Button>
        </div>

        <ReposWrapper />

        <div className="flex flex-col gap-2">
          <Label htmlFor="startDate" className="text-sm text-gray-300">
            Start Date:
          </Label>
          <Input
            id="startDate"
            type="date"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setStartDate(formatStringToDate(e.target.value))}
            className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="endDate" className="text-sm text-gray-300">
            End Date:
          </Label>
          <Input
            id="endDate"
            type="date"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setEndDate(formatStringToDate(e.target.value))}
            className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          className="w-full mt-4 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
          onClick={() => handleGenerateSummary()}
          disabled={isPending}
        >
          {isPending ? "Fetching..." : "Generate Summary"}
        </Button>
      </div>
    </aside>
  );
};

export { SummaryAside };
