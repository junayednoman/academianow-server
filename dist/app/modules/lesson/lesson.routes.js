"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonRoutes = void 0;
const express_1 = require("express");
const lesson_controller_1 = require("./lesson.controller");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const client_1 = require("@prisma/client");
const awss3_1 = require("../../utils/awss3");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const lesson_validation_1 = require("./lesson.validation");
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(client_1.UserRole.ADMIN), awss3_1.upload.single("explanation"), (0, handleZodValidation_1.default)(lesson_validation_1.lessonZod, { formData: true }), lesson_controller_1.lessonController.createLesson);
router.get("/:chapterId", (0, authorize_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), lesson_controller_1.lessonController.getLessonsByChapter);
router.get("/single/:id", (0, authorize_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), lesson_controller_1.lessonController.getSingleLesson);
router.patch("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), awss3_1.upload.single("explanation"), (0, handleZodValidation_1.default)(lesson_validation_1.lessonZod.partial(), { formData: true }), lesson_controller_1.lessonController.updateLesson);
router.delete("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), lesson_controller_1.lessonController.deleteLesson);
exports.lessonRoutes = router;
//# sourceMappingURL=lesson.routes.js.map