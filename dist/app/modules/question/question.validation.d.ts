import { z } from "zod";
export declare const createQuestionZod: z.ZodObject<{
    lessonId: z.ZodString;
    type: z.ZodEnum<{
        IMAGE: "IMAGE";
        SENTENCE: "SENTENCE";
    }>;
    question: z.ZodString;
    images: z.ZodOptional<z.ZodArray<z.ZodString>>;
    words: z.ZodOptional<z.ZodArray<z.ZodString>>;
    correctAnswer: z.ZodString;
    explanation: z.ZodOptional<z.ZodString>;
    index: z.ZodNumber;
}, z.core.$strip>;
export declare const updateQuestionZod: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        IMAGE: "IMAGE";
        SENTENCE: "SENTENCE";
    }>>;
    images: z.ZodOptional<z.ZodArray<z.ZodString>>;
    question: z.ZodOptional<z.ZodString>;
    words: z.ZodOptional<z.ZodArray<z.ZodString>>;
    correctAnswer: z.ZodOptional<z.ZodString>;
    explanation: z.ZodOptional<z.ZodString>;
    index: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=question.validation.d.ts.map