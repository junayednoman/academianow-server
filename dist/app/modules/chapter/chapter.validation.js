"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterZod = void 0;
const zod_1 = __importDefault(require("zod"));
exports.chapterZod = zod_1.default.object({
    bookId: zod_1.default.string().uuid("Book ID must be a valid UUID"),
    name: zod_1.default.string().min(1, "Name is required"),
    index: zod_1.default.number().min(1, "Index must be at least 1"),
});
//# sourceMappingURL=chapter.validation.js.map