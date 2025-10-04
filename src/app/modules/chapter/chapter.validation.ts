import z from "zod";

export const chapterZod = z.object({
  bookId: z.string().uuid("Book ID must be a valid UUID"),
  name: z.string().min(1, "Name is required"),
  index: z.number().min(1, "Index must be at least 1"),
});
