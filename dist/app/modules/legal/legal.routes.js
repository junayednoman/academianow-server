"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.legalRoutes = void 0;
const express_1 = require("express");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const client_1 = require("@prisma/client");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const legal_validation_1 = require("./legal.validation");
const legal_controller_1 = require("./legal.controller");
const router = (0, express_1.Router)();
router.patch("/", (0, authorize_1.default)(client_1.UserRole.ADMIN), (0, handleZodValidation_1.default)(legal_validation_1.legalInfoZod), legal_controller_1.legalController.createOrUpdateLegal);
router.get("/", legal_controller_1.legalController.getLegalInfo);
exports.legalRoutes = router;
//# sourceMappingURL=legal.routes.js.map