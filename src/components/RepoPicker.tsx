"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetRepos } from "@/services/queries";
import { useReposStore } from "@/stores/repos.store";
import { CommandLoading } from "cmdk";
import { Spinner } from "./Spinner";

export function RepoPicker() {
  const { data, isLoading } = useGetRepos();

  const [open, setOpen] = React.useState(false);
  const { repos, setRepos } = useReposStore();

  const handleSetValue = (val: string) => {
    if (repos.includes(val)) {
      repos.splice(repos.indexOf(val), 1);
      setRepos(repos.filter((repo) => repo !== val));
    } else {
      setRepos([...repos, val]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          <div className="flex overflow-hidden gap-2 justify-start">
            {repos?.length
              ? repos
                  .map((val, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 rounded-xl border bg-gray-800 text-xs font-medium"
                    >
                      {data?.find((data) => data === val)}
                    </div>
                  ))
                  .slice(0, 2)
              : "Select your repos..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search repo..." />
          <CommandList>
            {!isLoading && !data?.length ? <CommandEmpty>No repos found.</CommandEmpty> : null}
            <CommandGroup>
              {isLoading ? (
                <CommandLoading>
                  <div className="flex items-center justify-center h-16">
                    <Spinner className="fill-rose-600" />
                  </div>
                </CommandLoading>
              ) : (
                data?.map((data) => (
                  <CommandItem
                    key={data}
                    value={data}
                    onSelect={() => {
                      handleSetValue(data);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        repos.includes(data) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {data}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
