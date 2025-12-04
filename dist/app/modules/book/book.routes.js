"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const awss3_1 = require("../../utils/awss3");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const client_1 = require("@prisma/client");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const book_validation_1 = require("./book.validation");
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(client_1.UserRole.ADMIN), awss3_1.upload.single("image"), (0, handleZodValidation_1.default)(book_validation_1.bookZod, { formData: true }), book_controller_1.bookController.createBook);
router.get("/:subjectId", book_controller_1.bookController.getAllBooksBySubjectId);
router.get("/single/:id", book_controller_1.bookController.getSingleBook);
router.patch("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), awss3_1.upload.single("image"), (0, handleZodValidation_1.default)(book_validation_1.bookZod.partial(), { formData: true }), book_controller_1.bookController.updateBook);
router.delete("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), book_controller_1.bookController.deleteBook);
exports.bookRoutes = router;
//# sourceMappingURL=book.routes.js.map