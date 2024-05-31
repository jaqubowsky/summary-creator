export type FormattedCommit = {
  totalHours: number;
  totalMinutes: number;
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

export type SortedByDateCommit = {
  [date: string]: Commit[];
};
