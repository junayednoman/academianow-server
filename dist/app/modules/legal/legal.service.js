"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.legalService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createOrUpdateLegal = async (payload) => {
    const existing = await prisma_1.default.legal.findFirst({});
    let result = null;
    if (existing) {
        result = await prisma_1.default.legal.update({
            where: { id: existing.id },
            data: payload,
        });
    }
    else {
        result = await prisma_1.default.legal.create({ data: payload });
    }
    return result;
};
const getLegalInfo = async () => {
    const result = await prisma_1.default.legal.findFirst({});
    return result;
};
exports.legalService = { createOrUpdateLegal, getLegalInfo };
//# sourceMappingURL=legal.service.js.map