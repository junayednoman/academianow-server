"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectController = void 0;
const subject_service_1 = require("./subject.service");
const sendResponse_1 = require("../../utils/sendResponse");
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const createSubject = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await subject_service_1.subjectServices.createSubject(req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Subject created successfully!",
        data: result,
    });
});
const getAllSubjects = (0, handleAsyncRequest_1.default)(async (_req, res) => {
    const result = await subject_service_1.subjectServices.getAllSubjects();
    (0, sendResponse_1.sendResponse)(res, {
        message: "Subjects fetched successfully!",
        data: result,
    });
});
const getSingleSubject = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await subject_service_1.subjectServices.getSingleSubject(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Subject fetched successfully!",
        data: result,
    });
});
const updateSubject = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await subject_service_1.subjectServices.updateSubject(id, req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Subject updated successfully!",
        data: result,
    });
});
const deleteSubject = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await subject_service_1.subjectServices.deleteSubject(id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Subject deleted successfully!",
        data: result,
    });
});
exports.subjectController = {
    createSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
    deleteSubject,
};
//# sourceMappingURL=subject.controller.js.map