import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SummaryAsideProps = {
  repoInput: string;
  setRepoInput: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  handleGenerateDescriptions: () => void;
};

const SummaryAside = ({
  repoInput,
  setRepoInput,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleGenerateDescriptions,
}: SummaryAsideProps) => {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="repoInput" className="text-sm text-white">
          Repo to fetch:
        </Label>
        <Input
          id="repoInput"
          type="text"
          value={repoInput}
          onChange={(e) => setRepoInput(e.target.value)}
          className="bg-gray-800 text-white px-2 py-1 rounded-md"
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="startDate" className="text-sm text-white">
          Start Date:
        </Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-800 text-white px-2 py-1 rounded-md"
        />
        <Label htmlFor="endDate" className="text-sm text-white">
          End Date:
        </Label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-800 text-white px-2 py-1 rounded-md"
        />
        <Button className="w-full mt-4" onClick={handleGenerateDescriptions}>
          Fetch and generate
        </Button>
      </div>
    </div>
  );
};

export { SummaryAside };
