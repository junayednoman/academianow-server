import { z } from "zod";

export const paymentSchema = z.object({
  amount: z.number().int().min(1),
  subscriptionId: z.string().optional(),
  purpose: z.enum(["SUBSCRIPTION", "GOLD"]),
});
