"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRoutes = void 0;
const express_1 = require("express");
const question_controller_1 = require("./question.controller");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const client_1 = require("@prisma/client");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const question_validation_1 = require("./question.validation");
const awss3_1 = require("../../utils/awss3");
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(client_1.UserRole.ADMIN), (0, handleZodValidation_1.default)(question_validation_1.createQuestionZod), question_controller_1.questionController.createQuestion);
router.get("/:lessonId", question_controller_1.questionController.getQuestionsByLesson);
router.get("/single/:id", question_controller_1.questionController.getSingleQuestion);
router.patch("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), awss3_1.upload.array("images"), (0, handleZodValidation_1.default)(question_validation_1.updateQuestionZod.partial(), { formData: true }), question_controller_1.questionController.updateQuestion);
router.delete("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), question_controller_1.questionController.deleteQuestion);
router.delete("/image/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), question_controller_1.questionController.deleteImageFromQuestion);
exports.questionRoutes = router;
//# sourceMappingURL=question.routes.js.map