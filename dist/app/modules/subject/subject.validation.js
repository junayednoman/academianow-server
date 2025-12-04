"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectZod = void 0;
const zod_1 = __importDefault(require("zod"));
exports.subjectZod = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    index: zod_1.default
        .number()
        .min(1, "Index must be at least 1")
        .max(100, "Index must be at most 100"),
});
//# sourceMappingURL=subject.validation.js.map