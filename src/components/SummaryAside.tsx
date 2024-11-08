"use client";

import { formatStringToDate } from "@/lib/date/date";
import { useGenerateSummary } from "@/services/mutations";
import { useDateStore } from "@/stores/date.store";
import { useReposStore } from "@/stores/repos.store";
import { useSettingsStore } from "@/stores/settings.store";
import { RepoPicker } from "./RepoPicker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SummaryAside = () => {
  const { repos } = useReposStore();
  const { startDate, endDate, setStartDate, setEndDate } = useDateStore();
  const { product, setProduct, client, setClient, category, setCategory } = useSettingsStore();

  const { mutate: handleGenerateSummary, isPending } = useGenerateSummary();

  return (
    <aside className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex flex-col gap-4">
        <RepoPicker />

        <div className="flex flex-col gap-2">
          <Label htmlFor="category" className="text-sm text-gray-300">
            Category:
          </Label>
          <Input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="client" className="text-sm text-gray-300">
            Client:
          </Label>
          <Input
            id="client"
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Enter client"
            className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product" className="text-sm text-gray-300">
            Product:
          </Label>
          <Input
            id="product"
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Enter product"
            className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
          disabled={isPending || !startDate || !endDate || repos.length === 0}
        >
          {isPending ? "Fetching..." : "Generate Summary"}
        </Button>
      </div>
    </aside>
  );
};

export { SummaryAside };
