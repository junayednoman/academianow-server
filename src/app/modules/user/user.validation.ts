import { z } from "zod";

export const signUpValidationSchema = z.object({
  password: z
    .string()
    .min(7, "Password must be at least 7 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  user: z.object({
    email: z
      .string()
      .email("Invalid email address")
      .trim()
      .toLowerCase()
      .min(1, "Email is required"),
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters")
      .trim(),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
      .nullish()
      .transform(val => val ?? null),
    signUpSource: z
      .enum(
        [
          "FACEBOOK",
          "TIKTOK",
          "INSTAGRAM",
          "LINKEDIN",
          "GOOGLE",
          "YOUTUBE",
          "SCHOOL",
          "OTHER",
        ],
        { message: "Invalid sign up source" }
      )
      .nullish()
      .transform(val => val ?? null),
    practiceTime: z.string().min(1, "Practice time is required"),
    level: z.enum(["BASIS", "KADER", "TL", "HAVO", "GYMNASIUM"], {
      message: "Invalid user level",
    }),
    schoolLevel: z.enum(
      [
        "FIRST_YEAR",
        "SECOND_YEAR",
        "THIRD_YEAR",
        "FOURTH_YEAR",
        "FIFTH_YEAR",
        "SIXTH_YEAR",
      ],
      {
        message: "Invalid school level",
      }
    ),
    age: z
      .number()
      .int("Age must be a whole number")
      .min(5, "Age must be at least 5")
      .max(100, "Age must be less than 100"),
  }),
});

export type TSignUpInput = z.infer<typeof signUpValidationSchema> & {
  phone: string | null;
};
