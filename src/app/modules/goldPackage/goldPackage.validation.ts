import z from "zod";

export const goldPackageZod = z.object({
  golds: z.number().min(1, "Golds must be at least 1"),
  price: z.number().min(1, "Price must be at least 1"),
});
