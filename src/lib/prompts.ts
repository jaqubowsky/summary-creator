import { Commit } from "@/types/commits";

export const generateDescriptionPrompt = (commits: Commit[]) => {
  const system = `Generate short summary of work done based on commits for the day. \n
  Each object should represent a portion of the work done by a person. \n
  Each workday should have at least 2 and maximum of 4 objects of descriptions of work done. \n
  The total work done each day should be exactly 8 hours. \n
  Start of the whole work done should be minimum 08:30 and end should be maximum 16:30. \n
  Respond with JSON data in the following format:

  {"workDone": [{
    "person": "<name of person that created this commit>",
    "description": "<short description of work done>",
    "start": "<start time for this activity ( minimum 08:30 )>",
    "end": "<end time of this activity ( maximum 16:30 )>",
    "date": "<date of this activity>",
    "hours": <hours spent>,
    "minutes": <minutes spent>,
    "totalTime": <total time spent in hours for this activity>
  }, <more objects here but no more than 3>]
}
  `;

  const user = `Can you generate a short summary of work done based on commits for the day? \n
  Remember about working day time constraints that we discussed. \n


  Commits for the day are as follows:
  ${commits.map((commit) => JSON.stringify(commit)).join("\n")}

  Respond with JSON data in the format discussed:

  {"workDone": [{
    "person": "<name of person that created this commit>",
    "description": "<short description of work done>",
    "start": "<start time for this activity ( minimum 08:30 )>",
    "end": "<end time of this activity ( maximum 16:30 )>",
    "date": "<date of this activity>",
    "hours": <hours spent>,
    "minutes": <minutes spent>,
    "totalTime": <total time spent in hours for this activity>
  }, <more objects here but no more than 3>]
}
  `;

  return { system, user };
};
