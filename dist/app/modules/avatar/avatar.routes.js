"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarRoutes = void 0;
const express_1 = require("express");
const avatar_controller_1 = require("./avatar.controller");
const awss3_1 = require("../../utils/awss3");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const client_1 = require("@prisma/client");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const avatar_validation_1 = require("./avatar.validation");
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(client_1.UserRole.ADMIN), awss3_1.upload.single("icon"), (0, handleZodValidation_1.default)(avatar_validation_1.avatarZod, { formData: true }), avatar_controller_1.avatarController.createAvatar);
router.get("/", avatar_controller_1.avatarController.getAllAvatars);
router.patch("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), awss3_1.upload.single("icon"), (0, handleZodValidation_1.default)(avatar_validation_1.avatarZod.partial(), { formData: true }), avatar_controller_1.avatarController.updateAvatar);
router.delete("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), avatar_controller_1.avatarController.deleteAvatar);
exports.avatarRoutes = router;
//# sourceMappingURL=avatar.routes.js.map