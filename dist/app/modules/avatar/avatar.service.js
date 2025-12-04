"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarServices = void 0;
const ApiError_1 = __importDefault(require("../../middlewares/classes/ApiError"));
const awss3_1 = require("../../utils/awss3");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createAvatar = async (payload, file) => {
    if (!file)
        throw new ApiError_1.default(400, "Icon is required!");
    const existing = await prisma_1.default.avatar.findUnique({
        where: {
            index: payload.index,
        },
    });
    if (existing)
        throw new ApiError_1.default(400, "Avatar already exists with the index!");
    payload.icon = await (0, awss3_1.uploadToS3)(file);
    const result = await prisma_1.default.avatar.create({ data: payload });
    return result;
};
const getAllAvatars = async () => {
    const result = await prisma_1.default.avatar.findMany({
        orderBy: {
            index: "asc",
        },
    });
    return result;
};
const updateAvatar = async (id, payload, file) => {
    const avatar = await prisma_1.default.avatar.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    if (payload.index) {
        const existing = await prisma_1.default.avatar.findUnique({
            where: {
                index: payload.index,
            },
        });
        if (existing)
            throw new ApiError_1.default(400, "Avatar already exists with the index!");
    }
    if (file)
        payload.icon = await (0, awss3_1.uploadToS3)(file);
    const result = await prisma_1.default.avatar.update({
        where: {
            id: id,
        },
        data: payload,
    });
    if (result && payload.icon && avatar.icon) {
        await (0, awss3_1.deleteFromS3)(avatar.icon);
    }
    return result;
};
const deleteAvatar = async (id) => {
    const avatar = await prisma_1.default.avatar.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const associatedUsers = await prisma_1.default.user.findFirst({
        where: {
            avatarId: id,
        },
    });
    if (associatedUsers)
        throw new ApiError_1.default(400, "Avatar is associated with a user!");
    const result = await prisma_1.default.avatar.delete({
        where: {
            id: id,
        },
    });
    if (result && avatar.icon) {
        await (0, awss3_1.deleteFromS3)(avatar.icon);
    }
    return result;
};
exports.avatarServices = {
    createAvatar,
    getAllAvatars,
    updateAvatar,
    deleteAvatar,
};
//# sourceMappingURL=avatar.service.js.map