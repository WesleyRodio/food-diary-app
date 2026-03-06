import * as z from "zod";

export const mealsTypes = [
  { typeId: 1, label: "Café da manhã", icon: "☀️" },
  { typeId: 2, label: "Lanche manhã", icon: "🍎" },
  { typeId: 3, label: "Almoço", icon: "🥗" },
  { typeId: 4, label: "Lanche tarde", icon: "🫐" },
  { typeId: 5, label: "Jantar", icon: "🌙" },
  { typeId: 6, label: "Ceia", icon: "🌿" },
];

export const mealTypeSchema = z.z.object({
  typeId: z.number(),
  label: z.string(),
  icon: z.string(),
});
export type MealsTypes = z.infer<typeof mealTypeSchema>;

const mealSchema = z.object({
  id: z.number(),
  typeId: z.number(),
  food: z.string(),
  weight: z.number(),
  calories: z.number(),
  note: z.string(),
  date: z.string(),
  time: z.string(),
  done: z.boolean(),
});
export type MealType = z.infer<typeof mealSchema>;

export const mealRegister = mealSchema.omit({
  id: true,
  date: true,
  done: true,
});
export type MealRegisterType = z.infer<typeof mealRegister>;
