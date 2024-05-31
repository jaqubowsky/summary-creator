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
export type Commit = Omit<
  FormattedCommit,
  "totalHours" | "totalMinutes" | "totalTime"
>;
