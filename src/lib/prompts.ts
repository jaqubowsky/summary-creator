import { Commit } from "@/types/commits";

export const generateDescriptionPrompt = (commits: Commit[]) => {
  const system = `You are an expert in creating a clear summary of the work done based on the commits for the day. \n

  These are the rules you must follow: \n
  - Each entry should show a separate task done by the same person. \n
  - Each workday should have at least 2 and at most 3 task descriptions. \n
  - The workday should start no earlier than 08:30 and end no later than 16:30. \n
  - If you detect issue numbers ( for example #413 ) in the commit messages or other fields, include them in the issue field. \n
  - Total time must be in hours for example 1 hour and 30 minutes should be written as 1.5 hours. \n
  - Use simple and clear words for the descriptions.
  `;

  const user = `Please generate a concise summary of the work completed based on the commits for the day. \n
  Keep in mind the constraints we discussed. \n

  Most importantly, remember: \n
  - Each workday should have at least 2 and at most 3 task descriptions. \n

  The commits for the day are as follows:
  ${commits.map((commit) => JSON.stringify(commit)).join("\n")}
  `;

  return { system, user };
};
