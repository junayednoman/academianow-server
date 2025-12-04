"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterController = void 0;
const chapter_service_1 = require("./chapter.service");
const sendResponse_1 = require("../../utils/sendResponse");
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const createChapter = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await chapter_service_1.chapterServices.createChapter(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Chapter created successfully!",
        data: result,
    });
});
const getChaptersByBookId = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await chapter_service_1.chapterServices.getChaptersByBookId(req.params.bookId);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Chapters fetched successfully!",
        data: result,
    });
});
const getSingleChapter = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await chapter_service_1.chapterServices.getSingleChapter(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Chapter fetched successfully!",
        data: result,
    });
});
const updateChapter = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await chapter_service_1.chapterServices.updateChapter(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Chapter updated successfully!",
        data: result,
    });
});
const deleteChapter = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await chapter_service_1.chapterServices.deleteChapter(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Chapter deleted successfully!",
        data: result,
    });
});
exports.chapterController = {
    createChapter,
    getChaptersByBookId,
    getSingleChapter,
    updateChapter,
    deleteChapter,
};
//# sourceMappingURL=chapter.controller.js.map