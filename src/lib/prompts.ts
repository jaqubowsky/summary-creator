import { Commit } from "@/types/commits";

export const generateDescriptionPrompt = (commits: Commit[]) => {
  const system = `Generate short summary of work done based on commits for the day.
  Each description should represent a portion of the work done by a person.
  Each workday should have at least 2 descriptions and at most 4.
  The total work done each day should be exactly 8 hours.
  Start of the whole work done should be minimum 08:30 and end should be maximum 16:30 (8 hours).
  Respond with JSON data in the following format:

  {"workDone": [{
    "person": "<name of person that created this commit>",
    "description": "<short description of work done>",
    "start": "<start time for this activity>",
    "end": "<end time of this activity>",
    "date": "<date of this activity>",
    "hours": <hours spent>,
    "minutes": <minutes spent>,
    "totalTime": <total time spent in hours for this activity>
  },
...]
}
  `;

  const user = `Generate descriptions from provided commits for the day.

  Commits for the day are as follows:
  ${commits.map((commit) => JSON.stringify(commit)).join("\n")}

  Respond with JSON data in the format discussed:

  {"workDone": [{
    "person": "<name of person that created this commit>",
    "description": "<short description of work done>",
    "start": "<start time for this activity>",
    "end": "<end time of this activity>",
    "date": "<date of this activity>",
    "hours": <hours spent>,
    "minutes": <minutes spent>,
    "totalTime": <total time spent in hours for this activity>
  },
...]
}
  `;

  return { system, user };
};
