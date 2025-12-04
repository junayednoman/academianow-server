"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goldPackageServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createGoldPackage = async (payload) => {
    const result = await prisma_1.default.goldPackage.create({ data: payload });
    return result;
};
const getAllGoldPackages = async () => {
    return await prisma_1.default.goldPackage.findMany({ orderBy: { price: "asc" } });
};
const getSingleGoldPackage = async (id) => {
    return await prisma_1.default.goldPackage.findUnique({ where: { id } });
};
const updateGoldPackage = async (id, payload) => {
    await prisma_1.default.goldPackage.findUniqueOrThrow({ where: { id } });
    const result = await prisma_1.default.goldPackage.update({
        where: { id },
        data: payload,
    });
    return result;
};
const deleteGoldPackage = async (id) => {
    await prisma_1.default.goldPackage.findUniqueOrThrow({ where: { id } });
    const result = await prisma_1.default.goldPackage.delete({ where: { id } });
    return result;
};
exports.goldPackageServices = {
    createGoldPackage,
    getAllGoldPackages,
    getSingleGoldPackage,
    updateGoldPackage,
    deleteGoldPackage,
};
//# sourceMappingURL=goldPackage.service.js.map