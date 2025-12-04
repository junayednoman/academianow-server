"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goldPackageZod = void 0;
const zod_1 = __importDefault(require("zod"));
exports.goldPackageZod = zod_1.default.object({
    golds: zod_1.default.number().min(1, "Golds must be at least 1"),
    price: zod_1.default.number().min(1, "Price must be at least 1"),
});
//# sourceMappingURL=goldPackage.validation.js.map