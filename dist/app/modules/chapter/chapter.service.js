"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const ApiError_1 = __importDefault(require("../../middlewares/classes/ApiError"));
const createChapter = async (payload) => {
    const existingIndex = await prisma_1.default.chapter.findFirst({
        where: {
            index: payload.index,
            bookId: payload.bookId,
        },
    });
    if (existingIndex)
        throw new ApiError_1.default(400, "Chapter with this index already exists!");
    const existingName = await prisma_1.default.chapter.findFirst({
        where: {
            name: payload.name,
            bookId: payload.bookId,
        },
    });
    if (existingName)
        throw new ApiError_1.default(400, "Chapter with this name already exists!");
    return prisma_1.default.chapter.create({ data: payload });
};
const getChaptersByBookId = async (bookId) => {
    return prisma_1.default.chapter.findMany({
        where: {
            bookId,
        },
        orderBy: { index: "asc" },
        include: { book: true },
    });
};
const getSingleChapter = async (id) => {
    return prisma_1.default.chapter.findUniqueOrThrow({
        where: { id },
        include: { book: true },
    });
};
const updateChapter = async (id, payload) => {
    const chapter = await prisma_1.default.chapter.findUniqueOrThrow({ where: { id } });
    if (payload.index) {
        const existingIndex = await prisma_1.default.chapter.findFirst({
            where: {
                index: payload.index,
                bookId: payload.bookId || chapter.bookId,
            },
        });
        if (existingIndex)
            throw new ApiError_1.default(400, "Chapter with this index already exists!");
    }
    if (payload.name) {
        const existingName = await prisma_1.default.chapter.findFirst({
            where: {
                name: payload.name,
                bookId: payload.bookId || chapter.bookId,
            },
        });
        if (existingName)
            throw new ApiError_1.default(400, "Chapter with this name already exists!");
    }
    return prisma_1.default.chapter.update({
        where: { id },
        data: payload,
    });
};
const deleteChapter = async (id) => {
    return prisma_1.default.chapter.delete({ where: { id } });
};
exports.chapterServices = {
    createChapter,
    getChaptersByBookId,
    getSingleChapter,
    updateChapter,
    deleteChapter,
};
//# sourceMappingURL=chapter.service.js.map