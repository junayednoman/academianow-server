import { z } from "zod";
import { QuestionType } from "@prisma/client";

export const createQuestionZod = z.object({
  lessonId: z.string(),
  type: z.enum([QuestionType.IMAGE, QuestionType.SENTENCE]),
  question: z.string(),
  images: z.array(z.string()).optional(),
  words: z.array(z.string()).optional(),
  correctAnswer: z.string(),
  explanation: z.string().optional(),
  index: z.number(),
});

export const updateQuestionZod = z.object({
  type: z.enum([QuestionType.IMAGE, QuestionType.SENTENCE]).optional(),
  images: z.array(z.string()).optional(),
  question: z.string().optional(),
  words: z.array(z.string()).optional(),
  correctAnswer: z.string().optional(),
  explanation: z.string().optional(),
  index: z.number().optional(),
});
