"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
const userSignUp = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await user_service_1.userServices.userSignUp(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User signed up successfully!",
        data: result,
    });
});
const getAllUsers = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "orderBy"]);
    const result = await user_service_1.userServices.getAllUsers(req.query, options);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Users fetched successfully!",
        data: result,
    });
});
const getSingleUser = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await user_service_1.userServices.getSingleUser(req.params?.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User fetched successfully!",
        data: result,
    });
});
const getProfile = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await user_service_1.userServices.getProfile(req.user?.email);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Profile fetched successfully!",
        data: result,
    });
});
const updateProfile = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await user_service_1.userServices.updateProfile(req.user?.email, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Profile updated successfully!",
        data: result,
    });
});
const updateLastPracticeDate = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await user_service_1.userServices.updateLastPracticeDate(req.user?.email, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Date updated successfully!",
        data: result,
    });
});
const getUserRanking = (0, handleAsyncRequest_1.default)(async (_req, res) => {
    const result = await user_service_1.userServices.getUserRanking();
    (0, sendResponse_1.sendResponse)(res, {
        message: "User ranking fetched successfully!",
        data: result,
    });
});
const deleteUser = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await user_service_1.userServices.deleteUser(req.user.email);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User deleted successfully!",
        data: result,
    });
});
const updateActiveLessonId = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await user_service_1.userServices.updateActiveLessonId(req.body.activeLessonId, req.user.email);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Active lesson updated successfully!",
        data: result,
    });
});
exports.userController = {
    userSignUp,
    getAllUsers,
    getSingleUser,
    getProfile,
    updateProfile,
    updateLastPracticeDate,
    getUserRanking,
    deleteUser,
    updateActiveLessonId,
};
//# sourceMappingURL=user.controller.js.map