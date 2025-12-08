import { z } from "zod";
export declare const signUpValidationSchema: z.ZodObject<{
    password: z.ZodString;
    user: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodString;
        phone: z.ZodPipe<z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>;
        signUpSource: z.ZodPipe<z.ZodOptional<z.ZodNullable<z.ZodEnum<{
            FACEBOOK: "FACEBOOK";
            TIKTOK: "TIKTOK";
            INSTAGRAM: "INSTAGRAM";
            LINKEDIN: "LINKEDIN";
            GOOGLE: "GOOGLE";
            YOUTUBE: "YOUTUBE";
            SCHOOL: "SCHOOL";
            OTHER: "OTHER";
        }>>>, z.ZodTransform<"FACEBOOK" | "TIKTOK" | "INSTAGRAM" | "LINKEDIN" | "GOOGLE" | "YOUTUBE" | "SCHOOL" | "OTHER" | null, "FACEBOOK" | "TIKTOK" | "INSTAGRAM" | "LINKEDIN" | "GOOGLE" | "YOUTUBE" | "SCHOOL" | "OTHER" | null | undefined>>;
        practiceTime: z.ZodString;
        subjectId: z.ZodString;
        bookId: z.ZodString;
        level: z.ZodEnum<{
            BASIS: "BASIS";
            KADER: "KADER";
            TL: "TL";
            HAVO: "HAVO";
            GYMNASIUM: "GYMNASIUM";
        }>;
        schoolLevel: z.ZodEnum<{
            FIRST_YEAR: "FIRST_YEAR";
            SECOND_YEAR: "SECOND_YEAR";
            THIRD_YEAR: "THIRD_YEAR";
            FOURTH_YEAR: "FOURTH_YEAR";
            FIFTH_YEAR: "FIFTH_YEAR";
            SIXTH_YEAR: "SIXTH_YEAR";
        }>;
        age: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export type TSignUpInput = z.infer<typeof signUpValidationSchema> & {
    phone: string | null;
};
export declare const updateUserZod: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodPipe<z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>;
    avatarId: z.ZodOptional<z.ZodString>;
    practiceTime: z.ZodOptional<z.ZodString>;
    activeQuestionId: z.ZodOptional<z.ZodString>;
    activeLessonId: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodEnum<{
        BASIS: "BASIS";
        KADER: "KADER";
        TL: "TL";
        HAVO: "HAVO";
        GYMNASIUM: "GYMNASIUM";
    }>>;
    schoolLevel: z.ZodOptional<z.ZodEnum<{
        FIRST_YEAR: "FIRST_YEAR";
        SECOND_YEAR: "SECOND_YEAR";
        THIRD_YEAR: "THIRD_YEAR";
        FOURTH_YEAR: "FOURTH_YEAR";
        FIFTH_YEAR: "FIFTH_YEAR";
        SIXTH_YEAR: "SIXTH_YEAR";
    }>>;
    age: z.ZodOptional<z.ZodNumber>;
    coins: z.ZodOptional<z.ZodNumber>;
    hearts: z.ZodOptional<z.ZodNumber>;
    xp: z.ZodOptional<z.ZodNumber>;
    subjectId: z.ZodOptional<z.ZodString>;
    bookId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateActiveLessonIdZod: z.ZodObject<{
    activeLessonId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=user.validation.d.ts.map