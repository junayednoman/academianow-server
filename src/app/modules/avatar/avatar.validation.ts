import z from "zod";

export const avatarZod = z.object({
  index: z
    .number()
    .min(1, "Index must be at least 1")
    .max(100, "Index must be at most 100"),
  price: z.number().min(1, "Price must be at least 1"),
});
