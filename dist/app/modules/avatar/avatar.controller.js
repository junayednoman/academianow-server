"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarController = void 0;
const avatar_service_1 = require("./avatar.service");
const sendResponse_1 = require("../../utils/sendResponse");
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const createAvatar = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await avatar_service_1.avatarServices.createAvatar(req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Avatar created successfully!",
        data: result,
    });
});
const getAllAvatars = (0, handleAsyncRequest_1.default)(async (_req, res) => {
    const result = await avatar_service_1.avatarServices.getAllAvatars();
    (0, sendResponse_1.sendResponse)(res, {
        message: "Avatars fetched successfully!",
        data: result,
    });
});
const updateAvatar = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await avatar_service_1.avatarServices.updateAvatar(id, req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Avatar updated successfully!",
        data: result,
    });
});
const deleteAvatar = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await avatar_service_1.avatarServices.deleteAvatar(id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Avatar deleted successfully!",
        data: result,
    });
});
exports.avatarController = {
    createAvatar,
    getAllAvatars,
    updateAvatar,
    deleteAvatar,
};
//# sourceMappingURL=avatar.controller.js.map