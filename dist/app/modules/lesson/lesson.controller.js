"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonController = void 0;
const lesson_service_1 = require("./lesson.service");
const sendResponse_1 = require("../../utils/sendResponse");
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const createLesson = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await lesson_service_1.lessonServices.createLesson(req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Lesson created successfully!",
        data: result,
    });
});
const getLessonsByChapter = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await lesson_service_1.lessonServices.getLessonsByChapter(req.params.chapterId, req.user?.email);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Lessons fetched successfully!",
        data: result,
    });
});
const getSingleLesson = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await lesson_service_1.lessonServices.getSingleLesson(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Lesson fetched successfully!",
        data: result,
    });
});
const updateLesson = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await lesson_service_1.lessonServices.updateLesson(req.params.id, req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Lesson updated successfully!",
        data: result,
    });
});
const deleteLesson = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await lesson_service_1.lessonServices.deleteLesson(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Lesson deleted successfully!",
        data: result,
    });
});
exports.lessonController = {
    createLesson,
    getLessonsByChapter,
    getSingleLesson,
    updateLesson,
    deleteLesson,
};
//# sourceMappingURL=lesson.controller.js.map