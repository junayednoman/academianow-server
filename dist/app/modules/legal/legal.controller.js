"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.legalController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const sendResponse_1 = require("../../utils/sendResponse");
const legal_service_1 = require("./legal.service");
const createOrUpdateLegal = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await legal_service_1.legalService.createOrUpdateLegal(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Legal info updated successfully!",
        data: result,
    });
});
const getLegalInfo = (0, handleAsyncRequest_1.default)(async (_req, res) => {
    const result = await legal_service_1.legalService.getLegalInfo();
    (0, sendResponse_1.sendResponse)(res, {
        message: "Legal info retrieved successfully!",
        data: result,
    });
});
exports.legalController = { createOrUpdateLegal, getLegalInfo };
//# sourceMappingURL=legal.controller.js.map