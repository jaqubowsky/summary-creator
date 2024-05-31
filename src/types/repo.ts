import { Commit } from "./commits";

export interface Repo {
  name: string;
  owner: string;
  commits: Commit[];
}
