import z from "zod";

export const lessonZod = z.object({
  chapterId: z.string().uuid("Invalid chapterId"),
  name: z.string().min(1, "Name is required"),
  index: z.number().min(1, "Index must be at least 1"),
});
