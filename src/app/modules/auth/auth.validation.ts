import z from "zod";

export const verifyOtpZod = z.object({
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  otp: z
    .string()
    .min(6, "OTP must be at least 6 characters long")
    .max(6, "OTP must be at most 6 characters long"),
  verifyAccount: z.boolean().optional(),
});

export type TVerifyOtpInput = z.infer<typeof verifyOtpZod>;
