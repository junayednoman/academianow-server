"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goldPackageController = void 0;
const goldPackage_service_1 = require("./goldPackage.service");
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const sendResponse_1 = require("../../utils/sendResponse");
const createGoldPackage = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await goldPackage_service_1.goldPackageServices.createGoldPackage(req.body);
    (0, sendResponse_1.sendResponse)(res, { message: "Gold package created!", data: result });
});
const getAllGoldPackages = (0, handleAsyncRequest_1.default)(async (_req, res) => {
    const result = await goldPackage_service_1.goldPackageServices.getAllGoldPackages();
    (0, sendResponse_1.sendResponse)(res, { message: "Gold packages fetched!", data: result });
});
const getSingleGoldPackage = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await goldPackage_service_1.goldPackageServices.getSingleGoldPackage(req.params.id);
    (0, sendResponse_1.sendResponse)(res, { message: "Gold packages fetched!", data: result });
});
const updateGoldPackage = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await goldPackage_service_1.goldPackageServices.updateGoldPackage(id, req.body);
    (0, sendResponse_1.sendResponse)(res, { message: "Gold package updated!", data: result });
});
const deleteGoldPackage = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await goldPackage_service_1.goldPackageServices.deleteGoldPackage(id);
    (0, sendResponse_1.sendResponse)(res, { message: "Gold package deleted!", data: result });
});
exports.goldPackageController = {
    createGoldPackage,
    getAllGoldPackages,
    getSingleGoldPackage,
    updateGoldPackage,
    deleteGoldPackage,
};
//# sourceMappingURL=goldPackage.controller.js.map