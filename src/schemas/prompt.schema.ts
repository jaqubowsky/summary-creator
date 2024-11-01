import { z } from "zod";

const promptSchema = z.object({
  data: z.array(
    z.object({
      person: z.string(),
      description: z.string(),
      issue: z.string(),
      start: z.string(),
      end: z.string(),
      date: z.string(),
      hours: z.number(),
      minutes: z.number(),
      totalTime: z.number(),
    }),
  ),
});

export { promptSchema };
