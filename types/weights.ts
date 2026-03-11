import * as z from "zod";

export const weightSchema = z.object({
  weight: z.number(),
  date: z.string(),
  note: z.string(),
});
export type WeightType = z.infer<typeof weightSchema>;

export const weightRegister = weightSchema.omit({
  date: true,
});
export type WeightRegisterType = z.infer<typeof weightRegister>;
