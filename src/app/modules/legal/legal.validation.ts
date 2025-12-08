import { z } from "zod";

export const legalInfoZod = z.object({
  privacyPolicy: z.string().min(1, "Privacy Policy is required"),
  termsConditions: z.string().min(1, " Terms & Conditions is required"),
  about: z.string().min(1, "aboutUs is required"),
});

export type TLegalInfo = z.infer<typeof legalInfoZod>;
