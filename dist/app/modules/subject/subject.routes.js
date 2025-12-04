"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectRoutes = void 0;
const express_1 = require("express");
const subject_controller_1 = require("./subject.controller");
const awss3_1 = require("../../utils/awss3");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const client_1 = require("@prisma/client");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const subject_validation_1 = require("./subject.validation");
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(client_1.UserRole.ADMIN), awss3_1.upload.single("image"), (0, handleZodValidation_1.default)(subject_validation_1.subjectZod, { formData: true }), subject_controller_1.subjectController.createSubject);
router.get("/", subject_controller_1.subjectController.getAllSubjects);
router.get("/:id", subject_controller_1.subjectController.getSingleSubject);
router.patch("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), awss3_1.upload.single("image"), (0, handleZodValidation_1.default)(subject_validation_1.subjectZod.partial(), { formData: true }), subject_controller_1.subjectController.updateSubject);
router.delete("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), subject_controller_1.subjectController.deleteSubject);
exports.subjectRoutes = router;
//# sourceMappingURL=subject.routes.js.map