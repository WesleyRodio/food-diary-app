import * as z from "zod";

export const weightSchema = z.object({
  weight: z.number(),
  date: z.string(),
});
export type WeightType = z.infer<typeof weightSchema>;
