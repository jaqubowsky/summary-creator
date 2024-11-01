import { Commit } from "@/types/commits";

export const generateDescriptionPrompt = (commits: Commit[]) => {
  const system = `You are an expert in creating a clear summary of the work done based on the commits for the day. \n

  These are the rules you must follow: \n
  - Each workday should have at minumum 2 and at most 3 task descriptions. \n
  - Each workday must start at 08:30 and must end at 16:30. \n
  - If you detect issue numbers ( for example #413 ), include them in the issue field. \n
  - Hours and minutes field should be a natural number. \n
  - Use simple and clear words for the descriptions.
  `;

  const user = `Please generate a concise summary of the work completed based on the commits for the day. \n
  Keep in mind the constraints we discussed. \n

  Most importantly, remember: \n
  - Each workday should have minimum 2 and at most 3 task descriptions. \n

  The commits for the day are as follows:
  ${commits.map((commit) => JSON.stringify(commit)).join("\n")}
  `;

  return { system, user };
};
