import z from "zod";

export const bookZod = z.object({
  name: z.string().min(1, "Name is required"),
  subjectId: z.string().uuid("Invalid subjectId"),
});