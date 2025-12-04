"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookServices = void 0;
const ApiError_1 = __importDefault(require("../../middlewares/classes/ApiError"));
const awss3_1 = require("../../utils/awss3");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createBook = async (payload, file) => {
    if (!file)
        throw new ApiError_1.default(400, "Image is required!");
    const existing = await prisma_1.default.book.findUnique({
        where: { name: payload.name },
    });
    if (existing)
        throw new ApiError_1.default(400, "Book with this name already exists!");
    await prisma_1.default.subject.findUniqueOrThrow({
        where: { id: payload.subjectId },
    });
    payload.image = await (0, awss3_1.uploadToS3)(file);
    return prisma_1.default.book.create({ data: payload });
};
const getAllBooksBySubjectId = async (subjectId) => {
    return prisma_1.default.book.findMany({
        where: {
            subjectId,
        },
        include: { subject: true },
        orderBy: { name: "asc" },
    });
};
const getSingleBook = async (id) => {
    return prisma_1.default.book.findUnique({
        where: { id },
        include: { subject: true },
    });
};
const updateBook = async (id, payload, file) => {
    const book = await prisma_1.default.book.findUniqueOrThrow({ where: { id } });
    if (payload.name) {
        const existing = await prisma_1.default.book.findUnique({
            where: { name: payload.name },
        });
        if (existing && existing.id !== id) {
            throw new ApiError_1.default(400, "Another book already exists with this name!");
        }
    }
    if (payload.subjectId) {
        await prisma_1.default.subject.findUniqueOrThrow({
            where: { id: payload.subjectId },
        });
    }
    if (file)
        payload.image = await (0, awss3_1.uploadToS3)(file);
    const result = await prisma_1.default.book.update({
        where: { id },
        data: payload,
        include: { subject: true },
    });
    if (result && payload.image && book.image) {
        await (0, awss3_1.deleteFromS3)(book.image);
    }
    return result;
};
const deleteBook = async (id) => {
    const book = await prisma_1.default.book.findUniqueOrThrow({ where: { id } });
    const result = await prisma_1.default.book.delete({ where: { id } });
    if (result && book.image) {
        await (0, awss3_1.deleteFromS3)(book.image);
    }
    return result;
};
exports.bookServices = {
    createBook,
    getAllBooksBySubjectId,
    getSingleBook,
    updateBook,
    deleteBook,
};
//# sourceMappingURL=book.service.js.map