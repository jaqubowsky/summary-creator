export type FormattedCommit = {
  totalTime: number;
  person: string;
  description: string;
  issue: string;
  client: string;
  product: string;
  category: string;
  date: string;
  start: string;
  end: string;
  hours: number;
  minutes: number;
};

export type Commit = {
  repo: string;
  person: string;
  description: string;
  date: string;
};

export type AICommit = Commit & {
  start: string;
  end: string;
  date: string;
  hours: number;
  minutes: number;
  totalTime: number;
};

export type SortedByDateCommit = {
  [date: string]: Commit[];
};

export type SortedByDateAICommit = {
  [date: string]: AICommit[];
};
