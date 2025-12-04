"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goldPackageRoutes = void 0;
const express_1 = require("express");
const goldPackage_controller_1 = require("./goldPackage.controller");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const client_1 = require("@prisma/client");
const goldPackage_validation_1 = require("./goldPackage.validation");
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(client_1.UserRole.ADMIN), (0, handleZodValidation_1.default)(goldPackage_validation_1.goldPackageZod), goldPackage_controller_1.goldPackageController.createGoldPackage);
router.get("/", goldPackage_controller_1.goldPackageController.getAllGoldPackages);
router.get("/:id", goldPackage_controller_1.goldPackageController.getSingleGoldPackage);
router.patch("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), (0, handleZodValidation_1.default)(goldPackage_validation_1.goldPackageZod.partial()), goldPackage_controller_1.goldPackageController.updateGoldPackage);
router.delete("/:id", (0, authorize_1.default)(client_1.UserRole.ADMIN), goldPackage_controller_1.goldPackageController.deleteGoldPackage);
exports.goldPackageRoutes = router;
//# sourceMappingURL=goldPackage.routes.js.map