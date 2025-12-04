"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const book_service_1 = require("./book.service");
const sendResponse_1 = require("../../utils/sendResponse");
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const createBook = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await book_service_1.bookServices.createBook(req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, { message: "Book created successfully!", data: result });
});
const getAllBooksBySubjectId = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await book_service_1.bookServices.getAllBooksBySubjectId(req.params.subjectId);
    (0, sendResponse_1.sendResponse)(res, { message: "Books fetched successfully!", data: result });
});
const getSingleBook = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await book_service_1.bookServices.getSingleBook(req.params.id);
    (0, sendResponse_1.sendResponse)(res, { message: "Book fetched successfully!", data: result });
});
const updateBook = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await book_service_1.bookServices.updateBook(id, req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, { message: "Book updated successfully!", data: result });
});
const deleteBook = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await book_service_1.bookServices.deleteBook(id);
    (0, sendResponse_1.sendResponse)(res, { message: "Book deleted successfully!", data: result });
});
exports.bookController = {
    createBook,
    getAllBooksBySubjectId,
    getSingleBook,
    updateBook,
    deleteBook,
};
//# sourceMappingURL=book.controller.js.map