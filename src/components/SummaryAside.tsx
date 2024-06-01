import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SummaryAsideProps = {
  repoInput: string;
  setRepoInput: (value: string) => void;
  repos: string[];
  setRepos: (value: (repos: string[]) => string[]) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  handleGenerateDescriptions: () => void;
};

const SummaryAside = ({
  repoInput,
  setRepoInput,
  repos,
  setRepos,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleGenerateDescriptions,
}: SummaryAsideProps) => {
  const handleSetRepos = () => {
    if (!repoInput) return;
    if (repos.includes(repoInput)) return;

    setRepos((prevRepos) => [...prevRepos, repoInput]);
    setRepoInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSetRepos();
    }
  };

  const handleDeleteRepo = (repo: string) => {
    setRepos((prevRepos) => prevRepos.filter((r) => r !== repo));
  };

  const reposEls = repos.map((repo) => (
    <Button
      key={repo}
      variant="outline"
      size="sm"
      onClick={() => handleDeleteRepo(repo)}
      className="bg-gray-700 text-white border-gray-500 hover:bg-gray-600"
    >
      {repo}
    </Button>
  ));

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
            onKeyDown={handleKeyPress}
            className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            className="mt-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
            onClick={handleSetRepos}
          >
            Add Repo
          </Button>
        </div>

        {reposEls.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            <Label className="text-sm text-gray-300">Repos:</Label>
            <div className="flex flex-wrap flex-col gap-2">{reposEls}</div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="startDate" className="text-sm text-gray-300">
            Start Date:
          </Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          className="w-full mt-4 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
          onClick={handleGenerateDescriptions}
        >
          Fetch and Generate
        </Button>
      </div>
    </aside>
  );
};

export { SummaryAside };
