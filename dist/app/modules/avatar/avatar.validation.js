"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarZod = void 0;
const zod_1 = __importDefault(require("zod"));
exports.avatarZod = zod_1.default.object({
    index: zod_1.default
        .number()
        .min(1, "Index must be at least 1")
        .max(100, "Index must be at most 100"),
    price: zod_1.default.number().min(1, "Price must be at least 1"),
});
//# sourceMappingURL=avatar.validation.js.map