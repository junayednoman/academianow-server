"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterRoutes = void 0;
const express_1 = require("express");
const chapter_controller_1 = require("./chapter.controller");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const client_1 = require("@prisma/client");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const chapter_validation_1 = require("./chapter.validation");
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(client_1.UserRole.ADMIN), (0, handleZodValidation_1.default)(chapter_validation_1.chapterZod), chapter_controller_1.chapterController.createChapter);
router.get("/single/:id", chapter_controller_1.chapterController.getSingleChapter);
router.get("/:bookId", chapter_controller_1.chapterController.getChaptersByBookId);
router.patch("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), (0, handleZodValidation_1.default)(chapter_validation_1.chapterZod.partial()), chapter_controller_1.chapterController.updateChapter);
router.delete("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), chapter_controller_1.chapterController.deleteChapter);
exports.chapterRoutes = router;
//# sourceMappingURL=chapter.routes.js.map