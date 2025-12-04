"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestionZod = exports.createQuestionZod = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createQuestionZod = zod_1.z.object({
    lessonId: zod_1.z.string(),
    type: zod_1.z.enum([client_1.QuestionType.IMAGE, client_1.QuestionType.SENTENCE]),
    question: zod_1.z.string(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    words: zod_1.z.array(zod_1.z.string()).optional(),
    correctAnswer: zod_1.z.string(),
    explanation: zod_1.z.string().optional(),
    index: zod_1.z.number(),
});
exports.updateQuestionZod = zod_1.z.object({
    type: zod_1.z.enum([client_1.QuestionType.IMAGE, client_1.QuestionType.SENTENCE]).optional(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    question: zod_1.z.string().optional(),
    words: zod_1.z.array(zod_1.z.string()).optional(),
    correctAnswer: zod_1.z.string().optional(),
    explanation: zod_1.z.string().optional(),
    index: zod_1.z.number().optional(),
});
//# sourceMappingURL=question.validation.js.map