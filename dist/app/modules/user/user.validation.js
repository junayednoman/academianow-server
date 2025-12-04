"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZod = exports.signUpValidationSchema = void 0;
const zod_1 = require("zod");
const global_validation_1 = require("../../validation/global.validation");
const client_1 = require("@prisma/client");
exports.signUpValidationSchema = zod_1.z.object({
    password: global_validation_1.passwordZod,
    user: zod_1.z.object({
        email: zod_1.z
            .string()
            .email("Invalid email address")
            .trim()
            .toLowerCase()
            .min(1, "Email is required"),
        name: zod_1.z
            .string()
            .min(1, "Name is required")
            .max(100, "Name must be less than 100 characters")
            .trim(),
        phone: global_validation_1.phoneZod,
        signUpSource: zod_1.z
            .enum([
            "FACEBOOK",
            "TIKTOK",
            "INSTAGRAM",
            "LINKEDIN",
            "GOOGLE",
            "YOUTUBE",
            "SCHOOL",
            "OTHER",
        ], { message: "Invalid sign up source" })
            .nullish()
            .transform(val => val ?? null),
        practiceTime: zod_1.z.string().min(1, "Practice time is required"),
        subjectId: zod_1.z.string().uuid("Invalid subjectId"),
        bookId: zod_1.z.string().uuid("Invalid bookId"),
        level: zod_1.z.enum(["BASIS", "KADER", "TL", "HAVO", "GYMNASIUM"], {
            message: "Invalid user level",
        }),
        schoolLevel: zod_1.z.enum([
            "FIRST_YEAR",
            "SECOND_YEAR",
            "THIRD_YEAR",
            "FOURTH_YEAR",
            "FIFTH_YEAR",
            "SIXTH_YEAR",
        ], {
            message: "Invalid school level",
        }),
    }),
});
exports.updateUserZod = zod_1.z.object({
    name: zod_1.z.string().optional(),
    phone: global_validation_1.phoneZod,
    avatarId: zod_1.z.string().optional(),
    practiceTime: zod_1.z.string().optional(),
    activeQuestionId: zod_1.z.string().optional(),
    activeLessonId: zod_1.z.string().optional(),
    level: zod_1.z
        .enum([
        client_1.UserLevel.BASIS,
        client_1.UserLevel.GYMNASIUM,
        client_1.UserLevel.HAVO,
        client_1.UserLevel.KADER,
        client_1.UserLevel.TL,
    ])
        .optional(),
    schoolLevel: zod_1.z
        .enum([
        client_1.UserSchoolLevel.FIRST_YEAR,
        client_1.UserSchoolLevel.SECOND_YEAR,
        client_1.UserSchoolLevel.THIRD_YEAR,
        client_1.UserSchoolLevel.FOURTH_YEAR,
        client_1.UserSchoolLevel.FIFTH_YEAR,
        client_1.UserSchoolLevel.SIXTH_YEAR,
    ])
        .optional(),
    age: zod_1.z.number({ message: "Age must be a number" }).optional(),
    coins: zod_1.z.number({ message: "Coins must be a number" }).optional(),
    hearts: zod_1.z.number({ message: "Hearts must be a number" }).optional(),
    xp: zod_1.z.number({ message: "XP must be a number" }).optional(),
    subjectId: zod_1.z.string().uuid("Invalid subjectId").optional(),
    bookId: zod_1.z.string().uuid("Invalid bookId").optional(),
});
//# sourceMappingURL=user.validation.js.map