"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionController = void 0;
const question_service_1 = require("./question.service");
const sendResponse_1 = require("../../utils/sendResponse");
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const createQuestion = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await question_service_1.questionServices.createQuestion(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Question created successfully!",
        data: result,
    });
});
const getQuestionsByLesson = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await question_service_1.questionServices.getQuestionsByLesson(req.params.lessonId);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Questions fetched successfully!",
        data: result,
    });
});
const getSingleQuestion = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await question_service_1.questionServices.getSingleQuestion(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Question fetched successfully!",
        data: result,
    });
});
const updateQuestion = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await question_service_1.questionServices.updateQuestion(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Question updated successfully!",
        data: result,
    });
});
const deleteQuestion = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await question_service_1.questionServices.deleteQuestion(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Question deleted successfully!",
        data: result,
    });
});
const deleteImageFromQuestion = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await question_service_1.questionServices.deleteImageFromQuestion(req.params.id, req.body.image);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Question image deleted successfully!",
        data: result,
    });
});
exports.questionController = {
    createQuestion,
    getQuestionsByLesson,
    getSingleQuestion,
    updateQuestion,
    deleteQuestion,
    deleteImageFromQuestion,
};
//# sourceMappingURL=question.controller.js.map