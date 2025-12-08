"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const user_validation_1 = require("./user.validation");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/signup", (0, handleZodValidation_1.default)(user_validation_1.signUpValidationSchema), user_controller_1.userController.userSignUp);
router.get("/", (0, authorize_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.getAllUsers);
router.get("/ranking", user_controller_1.userController.getUserRanking);
router.get("/profile", (0, authorize_1.default)(client_1.UserRole.USER), user_controller_1.userController.getProfile);
router.get("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), user_controller_1.userController.getSingleUser);
router.patch("/", (0, authorize_1.default)(client_1.UserRole.USER), (0, handleZodValidation_1.default)(user_validation_1.updateUserZod), user_controller_1.userController.updateProfile);
router.patch("/update-practice-date", (0, authorize_1.default)(client_1.UserRole.USER), user_controller_1.userController.updateLastPracticeDate);
router.patch("/update-active-lesson", (0, authorize_1.default)(client_1.UserRole.USER), (0, handleZodValidation_1.default)(user_validation_1.updateActiveLessonIdZod), user_controller_1.userController.updateActiveLessonId);
router.delete("/", (0, authorize_1.default)(client_1.UserRole.USER), user_controller_1.userController.deleteUser);
exports.userRoutes = router;
//# sourceMappingURL=user.routes.js.map