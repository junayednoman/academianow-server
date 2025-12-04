"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.legalInfoZod = void 0;
const zod_1 = require("zod");
exports.legalInfoZod = zod_1.z.object({
    privacyPolicy: zod_1.z.string().min(1, "privacyPolicy is required"),
    termsAndConditions: zod_1.z.string().min(1, "termsAndConditions is required"),
    aboutUs: zod_1.z.string().min(1, "aboutUs is required"),
});
//# sourceMappingURL=legal.validation.js.map