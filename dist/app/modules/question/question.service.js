"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionServices = void 0;
const ApiError_1 = __importDefault(require("../../middlewares/classes/ApiError"));
const awss3_1 = require("../../utils/awss3");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createQuestion = async (payload) => {
    // Ensure lesson exists
    await prisma_1.default.lesson.findUniqueOrThrow({
        where: { id: payload.lessonId },
    });
    // Ensure unique index per lesson
    const existingIndex = await prisma_1.default.question.findFirst({
        where: {
            index: payload.index,
            lessonId: payload.lessonId,
        },
    });
    if (existingIndex)
        throw new ApiError_1.default(400, "Question with this index already exists!");
    return prisma_1.default.question.create({ data: payload });
};
const getQuestionsByLesson = async (lessonId) => {
    return await prisma_1.default.question.findMany({
        where: { lessonId },
        orderBy: { index: "asc" },
    });
};
const getSingleQuestion = async (id) => {
    return await prisma_1.default.question.findUnique({ where: { id } });
};
const updateQuestion = async (id, payload) => {
    const question = await prisma_1.default.question.findUniqueOrThrow({ where: { id } });
    if ((question.type === "IMAGE" && payload.type === "SENTENCE") ||
        (question.type === "IMAGE" && payload.words?.length) ||
        (question.type === "SENTENCE" && payload.type === "IMAGE") ||
        (question.type === "SENTENCE" && payload.images?.length)) {
        throw new ApiError_1.default(400, "Cannot change question type!");
    }
    if (payload.index) {
        const existingIndex = await prisma_1.default.question.findFirst({
            where: {
                index: payload.index,
                lessonId: payload.lessonId || question.lessonId,
            },
        });
        if (existingIndex && existingIndex.id !== id)
            throw new ApiError_1.default(400, "Question with this index already exists!");
    }
    return prisma_1.default.question.update({ where: { id }, data: payload });
};
const deleteImageFromQuestion = async (id, image) => {
    const question = await prisma_1.default.question.findUniqueOrThrow({ where: { id } });
    await (0, awss3_1.deleteFromS3)(image);
    const images = question.images.filter(i => i !== image);
    return prisma_1.default.question.update({
        where: { id },
        data: {
            images: images,
        },
    });
};
const deleteQuestion = async (id) => {
    const result = await prisma_1.default.question.delete({ where: { id } });
    if (result && result.type === "IMAGE") {
        for (const image of result.images) {
            await (0, awss3_1.deleteFromS3)(image);
        }
    }
};
exports.questionServices = {
    createQuestion,
    getQuestionsByLesson,
    getSingleQuestion,
    updateQuestion,
    deleteQuestion,
    deleteImageFromQuestion,
};
//# sourceMappingURL=question.service.js.map