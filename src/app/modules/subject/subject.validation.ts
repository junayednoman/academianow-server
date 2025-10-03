import z from "zod";

export const subjectZod = z.object({
  name: z.string().min(1, "Name is required"),
  index: z
    .number()
    .min(1, "Index must be at least 1")
    .max(100, "Index must be at most 100"),
});
