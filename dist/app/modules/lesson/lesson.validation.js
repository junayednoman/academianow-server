"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonZod = void 0;
const zod_1 = __importDefault(require("zod"));
exports.lessonZod = zod_1.default.object({
    chapterId: zod_1.default.string().uuid("Invalid chapterId"),
    name: zod_1.default.string().min(1, "Name is required"),
    index: zod_1.default.number().min(1, "Index must be at least 1"),
});
//# sourceMappingURL=lesson.validation.js.map