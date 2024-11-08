import { Commit } from "@/types/commits";

export const generateDescriptionPrompt = (commits: Commit[]) => {
  const system = `You are an expert in creating a clear and short summary of the work done based on the commits for the day. \n

  These are the rules you must follow: \n
  - Each workday should have at minimum 3 and at most 4 task descriptions. \n
  - Each workday must start at 08:30 and must end at 16:30. \n
  - If you detect issue links in the commits, include them in the correct 'Issue' field. \n
  - Combine only descriptions with the same issue link and ensure there is only one 'Issue'. \n
  - Hours and minutes field should be a natural number. \n
  - Use simple and clear words for the descriptions.
  `;

  const user = `Please generate a short and concise summary of the work completed based on the commits for the day. \n
  Keep in mind the constraints we discussed. \n

  Most importantly, remember: \n
  - Each workday should have minimum 3 and at most 4 task descriptions. \n

  The commits for the day are as follows:
  ${commits.map((commit) => JSON.stringify(commit)).join("\n")}
  `;

  return { system, user };
};
