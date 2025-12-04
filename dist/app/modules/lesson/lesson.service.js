"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonServices = void 0;
const ApiError_1 = __importDefault(require("../../middlewares/classes/ApiError"));
const awss3_1 = require("../../utils/awss3");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createLesson = async (payload, file) => {
    if (!file)
        throw new ApiError_1.default(400, "Explanation is required!");
    const existingIndex = await prisma_1.default.lesson.findFirst({
        where: {
            index: payload.index,
            chapterId: payload.chapterId,
        },
    });
    if (existingIndex)
        throw new ApiError_1.default(400, "Lesson with this index already exists!");
    const existingName = await prisma_1.default.lesson.findFirst({
        where: {
            name: payload.name,
            chapterId: payload.chapterId,
        },
    });
    if (existingName)
        throw new ApiError_1.default(400, "Lesson with this name already exists!");
    await prisma_1.default.chapter.findUniqueOrThrow({
        where: { id: payload.chapterId },
    });
    payload.explanation = await (0, awss3_1.uploadToS3)(file);
    return prisma_1.default.lesson.create({ data: payload });
};
const getLessonsByChapter = async (chapterId, email) => {
    const now = new Date();
    const user = await prisma_1.default.user.findUniqueOrThrow({ where: { email } });
    if (!user.lastHeartReset ||
        now.toDateString() !== user.lastHeartReset.toDateString()) {
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: { hearts: 5, lastHeartReset: now },
        });
    }
    return await prisma_1.default.lesson.findMany({
        where: {
            chapterId,
        },
        orderBy: { index: "asc" },
    });
};
const getSingleLesson = async (id) => {
    return await prisma_1.default.lesson.findUnique({ where: { id } });
};
const updateLesson = async (id, payload, file) => {
    const lesson = await prisma_1.default.lesson.findUniqueOrThrow({ where: { id } });
    if (!lesson)
        throw new ApiError_1.default(400, "Lesson not found!");
    if (payload.index) {
        const existingIndex = await prisma_1.default.lesson.findFirst({
            where: {
                index: payload.index,
                chapterId: payload.chapterId || lesson.chapterId,
            },
        });
        if (existingIndex && existingIndex.id !== id)
            throw new ApiError_1.default(400, "Lesson with this index already exists!");
    }
    if (payload.name) {
        const existingName = await prisma_1.default.lesson.findFirst({
            where: {
                name: payload.name,
                chapterId: payload.chapterId || lesson.chapterId,
            },
        });
        if (existingName && existingName.id !== id)
            throw new ApiError_1.default(400, "Lesson with this name already exists!");
    }
    if (file)
        payload.explanation = await (0, awss3_1.uploadToS3)(file);
    const result = await prisma_1.default.lesson.update({ where: { id }, data: payload });
    if (payload.explanation && result && lesson.explanation) {
        await (0, awss3_1.deleteFromS3)(lesson.explanation);
    }
    return result;
};
const deleteLesson = async (id) => {
    const result = await prisma_1.default.lesson.delete({ where: { id } });
    if (result)
        await (0, awss3_1.deleteFromS3)(result.explanation);
    return result;
};
exports.lessonServices = {
    createLesson,
    getLessonsByChapter,
    getSingleLesson,
    updateLesson,
    deleteLesson,
};
//# sourceMappingURL=lesson.service.js.map