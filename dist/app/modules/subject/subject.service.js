"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectServices = void 0;
const ApiError_1 = __importDefault(require("../../middlewares/classes/ApiError"));
const awss3_1 = require("../../utils/awss3");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createSubject = async (payload, file) => {
    if (!file)
        throw new ApiError_1.default(400, "Image is required!");
    const existing = await prisma_1.default.subject.findUnique({
        where: { name: payload.name },
    });
    if (existing)
        throw new ApiError_1.default(400, "Subject with this name already exists!");
    const existingIndex = await prisma_1.default.subject.findUnique({
        where: { index: payload.index },
    });
    if (existingIndex)
        throw new ApiError_1.default(400, "Subject with this index already exists!");
    payload.image = await (0, awss3_1.uploadToS3)(file);
    return prisma_1.default.subject.create({ data: payload });
};
const getAllSubjects = async () => {
    return prisma_1.default.subject.findMany({
        orderBy: { index: "asc" },
    });
};
const getSingleSubject = async (id) => {
    const result = await prisma_1.default.subject.findUnique({ where: { id } });
    return result;
};
const updateSubject = async (id, payload, file) => {
    const subject = await prisma_1.default.subject.findUniqueOrThrow({ where: { id } });
    if (payload.name) {
        const existing = await prisma_1.default.subject.findUnique({
            where: { name: payload.name },
        });
        if (existing && existing.id !== id) {
            throw new ApiError_1.default(400, "Another subject already exists with this name!");
        }
    }
    if (payload.index) {
        const existing = await prisma_1.default.subject.findUnique({
            where: { index: payload.index },
        });
        if (existing && existing.id !== id) {
            throw new ApiError_1.default(400, "Another subject already exists with this index!");
        }
    }
    if (file)
        payload.image = await (0, awss3_1.uploadToS3)(file);
    const result = await prisma_1.default.subject.update({
        where: { id },
        data: payload,
    });
    if (result && payload.image && subject.image) {
        await (0, awss3_1.deleteFromS3)(subject.image);
    }
    return result;
};
const deleteSubject = async (id) => {
    const subject = await prisma_1.default.subject.findUniqueOrThrow({ where: { id } });
    const result = await prisma_1.default.subject.delete({ where: { id } });
    if (result && subject.image) {
        await (0, awss3_1.deleteFromS3)(subject.image);
    }
    return result;
};
exports.subjectServices = {
    createSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
    deleteSubject,
};
//# sourceMappingURL=subject.service.js.map