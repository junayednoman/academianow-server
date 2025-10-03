import { z } from "zod";
import { passwordZod, phoneZod } from "../../validation/global.validation";
import { UserLevel, UserSchoolLevel } from "../../../../generated/prisma";

export const signUpValidationSchema = z.object({
  password: passwordZod,
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
    phone: phoneZod,
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

export const updateUserZod = z.object({
  name: z.string().optional(),
  phone: phoneZod,
  avatarId: z.string().optional(),
  practiceTime: z.string().optional(),
  activeQuestionId: z.string().optional(),
  activeLessonId: z.string().optional(),
  level: z
    .enum([
      UserLevel.BASIS,
      UserLevel.GYMNASIUM,
      UserLevel.HAVO,
      UserLevel.KADER,
      UserLevel.TL,
    ])
    .optional(),
  schoolLevel: z
    .enum([
      UserSchoolLevel.FIRST_YEAR,
      UserSchoolLevel.SECOND_YEAR,
      UserSchoolLevel.THIRD_YEAR,
      UserSchoolLevel.FOURTH_YEAR,
      UserSchoolLevel.FIFTH_YEAR,
      UserSchoolLevel.SIXTH_YEAR,
    ])
    .optional(),
  age: z.number({ message: "Age must be a number" }).optional(),
  coins: z.number({ message: "Coins must be a number" }).optional(),
  hearts: z.number({ message: "Hearts must be a number" }).optional(),
  currentStreakDays: z
    .number({ message: "Current Streak Days must be a number" })
    .optional(),
  xp: z.number({ message: "XP must be a number" }).optional(),
});
