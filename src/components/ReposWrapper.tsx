"use client";

import { useReposStore } from "@/stores/repos.store";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const ReposWrapper = () => {
  const { repos, removeRepo } = useReposStore();

  return (
    <div className="mt-4 flex flex-col gap-2">
      <Label className="text-sm text-gray-300">Added Repos:</Label>
      <div className="flex flex-wrap flex-col gap-2">
        {repos.map((repo) => (
          <Button
            key={repo}
            variant="outline"
            size="sm"
            onClick={() => removeRepo(repo)}
            className="bg-gray-700 text-white border-gray-500 hover:bg-gray-600"
          >
            {repo}
          </Button>
        ))}
      </div>
    </div>
  );
};

export { ReposWrapper };
